import { unlink } from 'node:fs/promises';
import chalk from 'chalk';

export const __file_remove = async (filePaths) => {

    // check whether the parameter sent is an array or not
    if (!Array.isArray(filePaths)) {
        throw new Error('filePaths must be an array')
    }

    // removie file and return value
    const results = await Promise.allSettled(
        filePaths.map(async (filePath) => {
            try {
                await unlink(filePath)
                console.info(chalk.bgBlue.bold(`File deleted: ${filePath}`))
                return { filePath, success: true }
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.warn(chalk.yellow(`File not found: ${filePath}`))
                    return { 
                        filePath, 
                        success: true, // atau false
                        error: 'FILE_NOT_FOUND' 
                    };
                } else {
                    console.error(chalk.red(`Error deleting ${filePath}:`), err.message)
                    return { 
                        filePath, 
                        success: false, 
                        error: err.message 
                    };
                }
            }
        })
    );

    const formattedResults = results.map(result => result.value || result.reason)
    const allSuccessful = formattedResults.every(result => result.success)

    return {
        success: allSuccessful,
        message: allSuccessful ? 'all files processed successfully' : 'some files could not be processed',
        results: formattedResults
    };
};