// @ts-ignore
import Papa from "papaparse"

export const parseCsvToJson = async (path: string): Promise<any[]> => {
    try {
        const result = await fetch(path)
        if (!result.ok) {
            throw new Error(`Can not find file in: ${path}`)
        }
        
        const content = await result.text()
        return await new Promise<any[]>((resolve, reject) => {
            Papa.parse(content, {
                header: true,
                dynamicTyping: true,                                               // keep 'number'
                skipEmptyLines: true,
                transform: (value: any) => value === '' ? null : value, // '' -> null
                complete: (results: any) => {
                    if (results.errors && results.errors.length > 0) {
                        reject(new Error("CSV parse errors"))
                    } else {
                        resolve(results.data as any[])
                    }
                },
                error: (error: any) => reject(error)
            })
        })

    } catch (error) {
        console.error(error)
        throw error
    }
}