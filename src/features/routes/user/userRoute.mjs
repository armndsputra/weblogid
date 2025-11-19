import  express  from 'express'
const router = express()

// controllers
import { fetchAllUser, deleteUser } from '../../controllers/userController.mjs'

// middleware
import { verifyDeleteUserData, verifyFetchAllUserData } from './middleware/index.mjs'

// service
import { deleteAccessUser } from '../../service/deleteAccessUser.mjs'
import { fetchAccessUser } from '../../service/fetchAccessUser.mjs'

// fetch all user
router.get('/', fetchAccessUser, verifyFetchAllUserData, fetchAllUser)

// delete user
router.delete('/:id', deleteAccessUser, verifyDeleteUserData, deleteUser)

export default router