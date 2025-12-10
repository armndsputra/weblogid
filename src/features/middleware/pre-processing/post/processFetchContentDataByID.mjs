import mongoose from "mongoose"

export const processFetchContentDataByID = async ( req, res, next) => {

    const id = req.params.id

    try {

        // 1. check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ 
            success : false,
            message : 'incorrect ID entered!'
        })

        req.id = id
        next()

    } catch (err) {
        // handle errors
        console.log(err)
        res.status(500).json({
            success : false,
            message : 'error processing fetch content data by ID!',
        })
    }

}