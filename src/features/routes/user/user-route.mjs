import  express  from 'express'
const router = express()

// controllers
import { fetchAllUser, deleteUser } from '../../controllers/user-controller.mjs'

// middleware
import { verifyDeleteUserData, verifyFetchAllUserData } from './middleware/index.mjs'

// fetch all user
router.get('/', verifyFetchAllUserData, fetchAllUser)

// delete user
router.delete('/:id', verifyDeleteUserData, deleteUser)

export default router