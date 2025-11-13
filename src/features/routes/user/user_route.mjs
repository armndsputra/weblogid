import  express  from 'express'
const router = express()

// controllers
import { register, fetchAllUser, deleteToUser } from '../../controllers/user_controller.mjs'

// middleware
import { bridgeToDeleteUser, bridgeToFetchAllUser, bridgeToRegister } from './middleware/main.mjs'

// fetch all user
router.get('/', bridgeToFetchAllUser, fetchAllUser)

// register
router.post('/register', bridgeToRegister, register)

// delete user
router.delete('/:id', bridgeToDeleteUser, deleteToUser)

export default router