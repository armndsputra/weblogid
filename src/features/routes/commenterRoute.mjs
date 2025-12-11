import  { Router }  from 'express'
const router = Router()

import { proccessCommentData,  processFetchAllCommentsByPostId } from '../middleware/pre-processing/index.mjs'

// controller
import { commenter, fetchCommenterByPostId } from '../controllers/commenterController.mjs'

import { mainAccessGuest } from '../middleware/service/mainAccessGuest.mjs'
import { mainAccessUser } from '../middleware/service/mainAccessUser.mjs'

// comment route
router.post('/:id', mainAccessGuest, proccessCommentData, commenter)

// fetch commenter by post id route
router.get('/:id', 
    mainAccessUser, 
    processFetchAllCommentsByPostId, 
    fetchCommenterByPostId
)  


export default router