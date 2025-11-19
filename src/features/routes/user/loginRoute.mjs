import  express  from 'express'
const router = express()

// middleware
import { verifyLoginData } from './middleware/index.mjs'

// service 
import { login } from '../../service/login.mjs'
import { loginAccess } from '../../service/loginAccess.mjs'

// register
router.post('/', loginAccess, verifyLoginData, login)

export default router