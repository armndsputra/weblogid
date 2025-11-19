import  express  from 'express'
const router = express()

// controllers
import { fetchAllUser, deleteUser } from '../../controllers/userController.mjs'

// middleware
import { verifyDeleteUserData, verifyFetchAllUserData } from './middleware/index.mjs'

// service
import { deleteAccess } from '../../service/deleteAccess.mjs'

// fetch all user
router.get('/', verifyFetchAllUserData, fetchAllUser)

// delete user
router.delete('/:id', deleteAccess, verifyDeleteUserData, deleteUser)

export default router