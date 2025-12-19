import fs from 'node:fs/promises'

export const __read_data = async (value) => {

    try {
        const data = await fs.readFile('json/data.json', 'utf8');
        const parsedData = JSON.parse(data);
        
        console.log('json data : ', parsedData);
        return parsedData.value
        
    } catch (error) {
        console.error('Terjadi error:', error);
    }

} 