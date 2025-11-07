import mongoose from "mongoose";

export const bridgeFetchDataByID = async ( req, res, next) => {

    const id = req.params.id

    try {

        // 1. check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message : 'invalid id!'})

        req.id = id
        next()

    } catch (err) {
        // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}