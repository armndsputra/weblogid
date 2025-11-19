// Model
import Contents from '../models/postalModel.mjs'

// find All data
export const fetchAllContent = async ( req, res ) => {
    
    try {

        // 1. fetch all
        const results = await Contents.find().skip(req.data.offset).limit(req.data.limit).exec()

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
export const saveContent = async ( req, res ) => {
    
    try {

        // 1. save a single document
        const content = new Contents(req.data)

        // 2. print the results
        const result = await content.save();
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
export const deleteContent = async ( req, res) => {

     try {
        
        // 1. remove data by ID
        const result = await Contents.deleteOne({_id : req.data._id}).exec()

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
export const updateContent = async ( req, res) => {

    try {
        
        // 1. update data by ID
        const result = await Contents.findByIdAndUpdate(req.id, req.data, { new: true })
        
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
export const fetchContentByID = async ( req, res ) => {

    const id = req.id

    try {

        // 1. fetch data by ID
        const result = await Contents.findById({_id : id}).exec()
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
export const fetchContentByKeywords = async ( req, res, next ) => {

    const keywords = req.keywords

    try {

        // 1. fetch data by keywords
        const result = await Contents.find({$or: [{ title: { $regex: keywords, $options: 'i' }}]})

        // 2. print data
        if (result) {
            return res.status(201).json({
                message : 'success',
                print : result.map(e => {
                    return {
                         title : e.title,
                         created : e.created,
                         user : e.user,
                         thumbnail : e.thumbnail,
                         content : e.content
                    }
                })
            })
        } else {
            return res.status(201).json({
                message : 'not found!',
                print : []
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
