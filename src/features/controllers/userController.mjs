// model
import Users from '../models/userModel.mjs'

// ------------------------------------------------------------------------
// register
// ------------------------------------------------------------------------
export const register = async ( req, res, next ) => {

    try {

        // 1. save a single document
        const user = new Users(req.data)
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
                    password : "*********",
                    gender: data.gender,
                    birhtday: data.birthday,
                    avatar : data.avatar,
                    role : data.role,
                    created : data.created
                }
            })
        }


    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'error system!'
         })
    }

}

// ------------------------------------------------------------------------
// fetch all user
// ------------------------------------------------------------------------
export const fetchAllUser = async ( req, res ) => {

    try {

        const { limit, offset } = req.pagination
    
        // 1. fetch all
        const data = await Users.find().skip(offset).limit(limit).exec()
    
        // 2. print results
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
                        created : e.created
                    }
                })
            })
        }
    
    } catch (err) {
        // handle errors
        console.error(err)
        return res.status(500).json({
            message : 'error system!',
        })
    }
}

// ------------------------------------------------------------------------
// delete user
// ------------------------------------------------------------------------
export const deleteUser =  async ( req, res ) => {

    try {

        const { id } = req.data

        // 1. delete user by ID
        const data = await Users.findByIdAndDelete(id)
        console.log(data)

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
            message : 'error system!'
         })
    }

}

// ------------------------------------------------------------------------
// update user
// ------------------------------------------------------------------------
export const updateUser = async ( req, res ) => {

    try {

        // 1. update data by ID
        const data = await Users.findByIdAndUpdate(req.id, req.data, { new: true })
        
        // 2. print the result
        return res.status(201).json({
            message : 'success : user successfully updated',
            data : {
                user : data.name,
                gender : data.gender,
                birthday : data.birthday,
                created : data.created,
                avatar : data.avatar,
            }
        })

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'error system !'
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
        console.log(data)

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
                created : data.created,
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
            message : 'error system!'
         })
    }

}

// ---------------------------------------------------------------
// update user role
// ---------------------------------------------------------------
export const updateUserRole = async ( req, res ) => {

    try {

        const { id, role } = req.data

        // 1. update user role by ID
        const data = await Users.findByIdAndUpdate(id, { role : role }, { new: true })

        // 2. print the result
        return res.status(201).json({
            success : true,
            message : 'success : user role successfully updated',
            data : {
                user : data.name,
                role : data.role,
                created : data.created,
            }
        })

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'error system !'
         })
    }

}