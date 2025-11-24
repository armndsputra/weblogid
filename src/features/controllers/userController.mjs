// Model
import Users from '../models/userModel.mjs'

// register
export const register = async ( req, res, next ) => {

    try {

        // 1. save a single document
        const user = new Users(req.data)
        const result = await user.save()

        // 2. print the results
        if (result) {
            return res.status(201).json({
                message : 'succed',
                 data : {
                    name : result.name,
                    username : result.username,
                    email : result.email,
                    gender: result.gender,
                    birhtday: result.birthday,
                    avatar : result.avatar,
                    role : result.role,
                    created : result.created
                 }
            })
        }


    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'Error system !'
         })
    }

}

// fetch all user
export const fetchAllUser = async ( req, res ) => {

    try {
    
        // 1. fetch all
        const results = await Users.find().skip().limit().exec()
    
        // 2. print results
        if (results) {
            return res.status(200).json({
                 message : 'success',
                data : results.map(e => {
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
            message : 'Error system !',
        })
    }
}

// delete user
export const deleteUser =  async ( req, res ) => {

    try {

        const { id } = req.data

        // 1. delete user by ID
        const user = await Users.findByIdAndDelete(id)
        console.log(user)

        // 2. print user
        if (user) {
            return res.status(200).json({
                message : 'the user has been successfully deleted',
                deleted : {
                    id : user._id,
                    name : user.name,
                    user : user.username,
                    email : user.email
                }
            })
        }

    } catch (err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'error system !'
         })
    }

}

// update user
export const updateUser = async ( req, res ) => {

    try {

        // 1. update data by ID
        const data = await Users.findByIdAndUpdate(req.id, req.data, { new: true })
        
        // 2. print the result
        return res.status(201).json({
            message : 'success',
            print : {
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