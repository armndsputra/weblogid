import  express  from 'express'
const router = express()

// controllers
import { register } from '../../controllers/user-controller.mjs'

// middleware
import { verifyRegisterData } from './middleware/index.mjs'

// register
router.post('/', verifyRegisterData, register)

export default router