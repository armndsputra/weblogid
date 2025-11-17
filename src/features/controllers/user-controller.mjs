// Model
import Users from '../models/user-model.mjs'

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
                    avatar : result.avatar
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

        // 1. remove data by ID
        const result = await Users.deleteOne({_id : req.data._id}).exec()

        // 2. print result data
        if (result) {
            return res.status(200).json({
                message : 'deleted',
                deleted : result.deletedCount
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