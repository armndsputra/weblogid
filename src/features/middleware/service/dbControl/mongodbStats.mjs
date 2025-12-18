import mongoose from 'mongoose'

export const getMongoDBStats = async ( req, res, next) => {
    
    try {

        const db =mongoose.connection.db
        // console.log(db)

        const stats = await db.stats();
        // console.log(stats)
        console.log("-----------------------------------------------------------------------")
        console.log("Database Statistics :")
        console.log("-----------------------------------------------------------------------")
        console.log(`Database Name              : ${stats.db}`)
        console.log(`Collections                : ${stats.collections}`)
        console.log(`Documents                  : ${stats.objects}`)
        console.log(`Indexes                    : ${stats.indexes}`)
        console.log(`Index Size (MB)            : ${stats.indexSize / (1024 * 1024)}`)
        console.log(`Data Size (MB)             : ${stats.dataSize / (1024 * 1024)}`)
        console.log(`Storage Size (MB)          : ${stats.storageSize / (1024 * 1024)}`)
        console.log(`Average Object Size (KB)   : ${(stats.avgObjSize / 1024).toFixed(2)}`)
        console.log("-----------------------------------------------------------------------")
        console.log("Disk usage statistics :")
        console.log("-----------------------------------------------------------------------")
        console.log(`fsDiskUsedSize : ${stats.fsUsedSize / (1024 * 1024 * 1024)} GB`)
        console.log(`fsDiskTotalSize : ${stats.fsTotalSize / (1024 * 1024 * 1024)} GB`)
        console.log(`fsDiskFreeSize : ${stats.fsTotalSize / (1024 * 1024 * 1024) - stats.fsUsedSize / (1024 * 1024 * 1024)} GB`)
        console.log("-----------------------------------------------------------------------")
        console.log(`OK : ${stats.ok}`)
        console.log("-----------------------------------------------------------------------")

        // fetching database statistics
        const dbStats = {
            dbName: stats.db,
            collections: stats.collections,
            documents: stats.objects,
            indexes: stats.indexes,
            indexSizeMB: stats.indexSize / (1024 * 1024),
            dataSizeMB: stats.dataSize / (1024 * 1024),
            storageSizeMB: stats.storageSize / (1024 * 1024),
            avgObjSizeKB: (stats.avgObjSize / 1024).toFixed(2),
            diskStatistics: {
                fsDiskUsedSizeGB: stats.fsUsedSize / (1024 * 1024 * 1024),
                fsDiskTotalSizeGB: stats.fsTotalSize / (1024 * 1024 * 1024),
                fsDiskFreeSizeGB: stats.fsTotalSize / (1024 * 1024 * 1024) - stats.fsUsedSize / (1024 * 1024 * 1024)
            },
            ok: stats.ok    
        }

        return res.status(200).json({
            success: true,
            message: 'Database statistics fetched successfully',
            data: dbStats
        })  
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: 'Error fetching database statistics',
            // error: err.message
        })
    }
};