import  { Router }  from 'express'
const router = Router()

// middleware
import { processLoginData } from '../middleware/pre-processing/index.mjs'

// service 
import { login } from '../middleware/service/accessControl/login.mjs'
import { loginAccess } from '../middleware/service/accessControl/loginAccess.mjs'

// register
router.post('/', loginAccess, processLoginData, login)

export default router