import  { Router }  from 'express'
const router = Router()
import mongoose from 'mongoose'

router.get('/', async (req, res, next) => {

    try {

        const db =mongoose.connection.db
        // console.log(db)

         const stats = await db.stats();
        console.log(stats)
        // Simulate fetching database statistics
        const dbStats = {
            dbName: stats.db,
            collections: 12,
            documents: 34567,
            indexes: 45,
            storageSizeMB: 123.45,
            avgObjSizeKB: 3.4
        }

        res.status(200).json({
            success: true,
            message: 'fetched database statistics successfully',
            data: dbStats
        })
    } catch (error) {
        next(error)
    }
})

export default router