import  { Router }  from 'express'
const router = Router()

import { getMongoDBStats } from '../middleware/service/dbControl/mongodbStats.mjs'

router.get('/', getMongoDBStats)

export default router