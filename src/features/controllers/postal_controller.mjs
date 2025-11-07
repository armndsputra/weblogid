// Model
import Blogs from '../models/postal_model.mjs'

// find All data
export const fetchAll = async ( req, res ) => {
    
    try {

        // 1. fetch all
        const results = await Blogs.find().exec()

        // 2. print results
        if (results) {
            return res.status(200).json({
                message : 'success',
                print : results.map(e => {
                    return {
                        id : e._id,
                        user : e.user,
                        created : e.created,
                        title : e.title,
                        thubnail : e.thumbnail,
                        content : e.content
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

// save
export const saveToDatabase = async ( req, res ) => {
    
    try {

        // 1. save a single document
        const blogs = new Blogs(req.data)

        // 2. print the results
        const result = await blogs.save();
        if (result) return res.status(201).json({
            message : 'succeed',
            print : {
                user : result.user,
                title : result.title,
                created : result.created,
                thumbnail : result.thumbnail,
                content : result.content
            }
        })
       
    } catch(err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'Error system !'
         })
    }
}

// remove data
export const deleteToDatabase = async ( req, res) => {

     try {
        
        // 1. remove data by ID
        const result = await Blogs.deleteOne({_id : req.data._id}).exec()

        // 2. print result data
        if (result) {
            return res.status(200).json({
                message : 'deleted',
                deleted : result.deletedCount
            })
        }
        
    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }
}

// edit / update data
export const updateToDatabase = async ( req, res) => {

    try {
        
        // 1. update data by ID
        const result = await Blogs.findByIdAndUpdate(req.id, req.data, { new: true })
        
        // 2. print the result
        return res.status(201).json({
            message : 'success',
            print : {
                user : result.user,
                title : result.title,
                created : result.created,
                thumbnail : result.thumbnail,
                content : result.content
            }
        })
      
    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}

// fetch data by id
export const fetchDataByID = async ( req, res ) => {

    const id = req.id

    try {

        // 1. fetch data by ID
        const result = await Blogs.findById({_id : id}).exec()
        console.log(result)

        // 2. print data
        if (result) return res.status(200).json({
            message : 'success',
            print : {
                user : result.user,
                title : result.title,
                created : result.created,
                thumbnail : result.thumbnail,
                content : result.content
            }
        })
        
        // 2.1 if data not found
        if (!result) return res.status(200).json({
            message : 'success',
            print : []
        })

        return

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}

// fetch data by keywords
export const fetchDataByKeywords = async ( req, res, next ) => {

    const keywords = req.keywords

    try {

        // 1. fetch data by keywords
        const result = await Blogs.find({$or: [{ title: { $regex: keywords, $options: 'i' }}]})

        console.table(result)
        return

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}
