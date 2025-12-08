import  { Router }  from 'express'
const router = Router()

// controllers
import { fetchAllUser, deleteUser, updateUser, fetchUserByID, updateUserRole } from '../controllers/userController.mjs'

// middleware
import { 
    processDeleteUserData,
    processFetchAllUserData, 
    processUpdateUserData, 
    processFetchUserDataByID,
    processUpdateUserRoleData
} from './middleware/index.mjs'

// service
import { deleteAccessUser } from '../service/deleteAccessUser.mjs'
import { fetchAccessUser } from '../service/fetchAccessUser.mjs'
import { updateAccessUser } from '../service/updateAccessUser.mjs'
import { mainAccessAdmin } from '../service/mainAccessAdmin.mjs'

// route helpers
import { upload } from './middleware/user/helpers/_set_multer.mjs'


// fetch all user
router.get('/', fetchAccessUser, processFetchAllUserData, fetchAllUser)

// fetch user by ID
router.get('/:id', mainAccessAdmin, processFetchUserDataByID, fetchUserByID)

// update user
router.patch('/:id',updateAccessUser, upload.array('avatar'), processUpdateUserData, updateUser)

// delete user
router.delete('/:id', deleteAccessUser, processDeleteUserData, deleteUser)

// update user role
router.patch('/role/:id', mainAccessAdmin, processUpdateUserRoleData, updateUserRole)

export default router