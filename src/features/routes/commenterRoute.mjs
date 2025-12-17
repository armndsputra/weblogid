import  { Router }  from 'express'
const router = Router()

import { processCommentData,  processFetchAllCommentsByPostId, processDeleteCommentData, processFetchAllCommentData } from '../middleware/pre-processing/index.mjs'

// controller
import { commenter, fetchCommenterByPostId, deleteCommenter, fetchAllCommenter } from '../controllers/commenterController.mjs'

import { mainAccessGuest } from '../middleware/service/mainAccessGuest.mjs'
import { mainAccessUser } from '../middleware/service/mainAccessUser.mjs'
import { mainAccessAdmin } from '../middleware/service/mainAccessAdmin.mjs'

// comment route
router.post('/:id', mainAccessGuest, processCommentData, commenter)

// fetch all commenter by post id/content id
router.get('/:id', 
    mainAccessUser, 
    processFetchAllCommentsByPostId, 
    fetchCommenterByPostId
)  

router.delete('/:id', mainAccessAdmin, processDeleteCommentData, deleteCommenter)

// fetch all commenter 
router.get('/', processFetchAllCommentData, fetchAllCommenter)


export default router