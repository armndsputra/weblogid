import  { Router }  from 'express'
const router = Router()

import { 
    processCommentData,
    processFetchAllCommentsByPostId, 
    processDeleteCommentData, 
    processFetchAllCommentData 
} from '../middleware/pre-processing/index.mjs'

// controller
import { commenter, fetchCommenterByPostId, deleteCommenter, fetchAllCommenter } from '../controllers/commenterController.mjs'

// services
import { AccessControlService } from '../middleware/service/accessControl/AccessControlService.mjs'

const accessControlService = new AccessControlService()

const admin = accessControlService.allowAccess('admin')
const user = accessControlService.allowAccess('user')
const guest = accessControlService.allowAccess('guest')

// comment route
router.post('/:id', guest, processCommentData, commenter)

// fetch all commenter by post id/content id
router.get('/:id', 
    user, 
    processFetchAllCommentsByPostId, 
    fetchCommenterByPostId
)  

router.delete('/:id', admin, processDeleteCommentData, deleteCommenter)

// fetch all commenter 
router.get('/', processFetchAllCommentData, fetchAllCommenter)

router.use((err, req, res, next) => {
    console.error(err)
})


export default router