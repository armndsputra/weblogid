import chalk from 'chalk'

// model
import Users from '../models/userModel.mjs'

// ------------------------------------------------------------------------
// register
// ------------------------------------------------------------------------
export const register = async ( req, res, next ) => {

    try {

        // 1. save a single document
        const user = new Users(req.processRegisterData)
        const data = await user.save()

        // 2. print user data
        if (data) {
            return res.status(201).json({
                success : true,
                message : 'success : user has successfully registered',
                 data : {
                    id : data._id,
                    name : data.name,
                    username : data.username,
                    email : data.email,
                    password : "**********",
                    gender: data.gender,
                    birthday: data.birthday,
                    avatar : data.avatar,
                    role : data.role,
                    createdAt : data.createdAt,
                }
            })
        }


    } catch (err) {
        // handle errors
        console.error(err)
        return res.status(500).json({ 
            success : false,
            message : 'error in registering process!',
         })
    }

}

// ------------------------------------------------------------------------
// fetch all user
// ------------------------------------------------------------------------
export const fetchAllUser = async ( req, res ) => {

    try {

        const { limit, offset } = req.pagination
    
        // fetch all
        const data = await Users.find().skip(offset).limit(limit).exec()

        console.log('----------------------- Fetch All User ---------------------------')
        console.log(chalk.blueBright(`Fetch All User Data - Count : ${data.length}`))
        console.log('---------------------------------------------------------------')
    
        // print data
        if (data) {
            return res.status(200).json({
                success : true,
                message : 'success : user successfully displayed',
                data : data.map(e => {
                    return {
                        id : e._id,
                        name : e.name,
                        username : e.username,
                        email : e.email,
                        gender : e.gender,
                        birthday : e.birthday,
                        avatar : e.avatar,
                        role : e.role,
                        createdAt : e.createdAt,
                    }
                })
            })
        }
    
    } catch (err) {
        // handle errors
        console.error(err)
        return res.status(500).json({
            success : false,
            message : 'error processing fetch all user data!',
        })
    }
}

// ------------------------------------------------------------------------
// delete user
// ------------------------------------------------------------------------
export const deleteUser =  async ( req, res ) => {

    try {

        const { id } = req.processUserData

        // 1. delete user by ID
        const data = await Users.findByIdAndDelete(id)
        console.log('------------------------ Deleted User ---------------------------------')
        console.log(data)
        console.log('-----------------------------------------------------------------------')

        // 2. print user data
        if (data) {
            return res.status(200).json({
                success : true,
                message : 'success : the user has been successfully deleted',
                data : {
                    id : data._id,
                    name : data.name,
                    username : data.username,
                    email : data.email
                }
            })
        }

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            success : false,
            message : 'error in delete process!'
         })
    }

}

// ------------------------------------------------------------------------
// update user
// ------------------------------------------------------------------------
export const updateUser = async ( req, res ) => {

    try {

        // 1. update data by ID
        const data = await Users.findByIdAndUpdate(req.id, req.processUpdateUserData, { new: true })
        
        // 2. print the user data
        return res.status(201).json({
            success : true,
            message : 'success : user successfully updated',
            data : {
                name : data.name,
                username : data.username,
                email : data.email,
                gender : data.gender,
                birthday : data.birthday,
                createdAt : data.createdAt,
                avatar : data.avatar,
            }
        })

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            success : false,
            message : 'error processing update user data!'
         })
    }

}

// ------------------------------------------------------------------------
// fetch user by ID
// ------------------------------------------------------------------------
export const fetchUserByID = async ( req, res ) => {

    const id = req.id

    try {

        // 1. fetch data by ID
        const data = await Users.findById({_id : id}).exec()
        console.log('------------------------ Detail User ----------------------------------')
        console.log(data)
        console.log('-----------------------------------------------------------------------')

        // 2. print data
        if (data) return res.status(200).json({
            success : true,
            message : 'success : user is displayed by ID',
            data : {
                id : data._id,
                user : data.user,
                email : data.email,
                gender : data.gender,
                birthday : data.birthday,
                role : data.role,
                createdAt : data.createdAt,
            }
        })
        
        // 2.1 if data not found
        if (!data) return res.status(200).json({
            success : true,
            message : 'success : user not found by ID',
            data : []
        })

        return

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            success : false,
            message : 'error processing fetch user by ID!'
         })
    }

}

// ---------------------------------------------------------------
// update user role
// ---------------------------------------------------------------
export const updateUserRole = async ( req, res ) => {

    try {

        const { id, role } = req.processUpdateUserRoleData

        // 1. update user role by ID
        const data = await Users.findByIdAndUpdate(id, { role : role }, { new: true })

        // 2. print the result
        return res.status(201).json({
            success : true,
            message : 'success : user role successfully updated',
            data : {
                name : data.name,
                username : data.username,
                email : data.email,
                role : data.role,
                createdAt : data.createdAt,
            }
        })

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            success : false,
            message : 'error processing update user role data!'
         })
    }

}