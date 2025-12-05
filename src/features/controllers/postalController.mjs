// Model
import Contents from '../models/postalModel.mjs'

// find All data
export const fetchAllContent = async ( req, res ) => {
    
    try {

        // 1. fetch all
        const data = await Contents.find().skip(req.data.offset).limit(req.data.limit).populate('user', 'id name').exec()
        console.log(data)
        // 2. print content data
        if (data) {
            return res.status(200).json({
                message : 'success : content successfully displayed',
                data : data.map(e => {
                    return {
                        id : e._id,
                        title : e.title,
                        content : e.content,
                        thubnail : e.thumbnail,
                        created : e.created,
                        author : e.user,
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

// save
export const saveContent = async ( req, res ) => {
    
    try {

        // 1. save a single document
        const content = new Contents(req.data)

        // 2. print the results
        const data = await (await content.save()).populate('user', 'id name')
        if (data) return res.status(201).json({
            message : 'success : content created successfully',
            data : {
                id : data._id,
                title : data.title,
                content : data.content,
                thumbnail : data.thumbnail,
                created : data.created,
                author : data.user,
            }
        })
       
    } catch(err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            message : 'error system!'
         })
    }
}

// remove data
export const deleteContent = async ( req, res) => {

     try {
        
        const id = req.data.id

        // 1. remove data by ID
        const data = await Contents.findByIdAndDelete(id).populate('user', 'id name')

        // 2. print content data
        if (data) {
            return res.status(200).json({
                message : 'success : content successfully deleted',
                data : {
                    id : data._id,
                    title : data.title,
                    author : data.user,
                }
            })
        }
        
    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'error system!',
        })
    }
}

// edit / update data
export const updateContent = async ( req, res) => {

    try {
        
        // 1. update data by ID
        const data = await Contents.findByIdAndUpdate(req.id, req.data, { new: true }).populate('user', 'id name')
        
        // 2. print the data
        return res.status(201).json({
            message : 'success : content successfully updated',
            data : {
                id : data._id,
                title : data.title,
                content : data.content,
                thumbnail : data.thumbnail,
                created : data.created,
                author : data.user,
            }
        })
      
    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'error system!',
        })
    }

}

// fetch data by id
export const fetchContentByID = async ( req, res ) => {

    const id = req.id

    try {

        // 1. fetch data by ID
        const data = await Contents.findById({_id : id}).populate('user', 'id name').exec()
        console.log(data)

        // 2. print data
        if (data) return res.status(200).json({
            message : 'success : content is displayed by ID',
            data : {
                id : data._id,
                title : data.title,
                content : data.content,
                thumbnail : data.thumbnail,
                created : data.created,
                author : data.user,
            }
        })
        
        // 2.1 if data not found
        if (!data) return res.status(200).json({
            message : 'failure : content not found!',
            data : []
        })

        return

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            message : 'error system!',
        })
    }

}

// fetch data by keywords
export const fetchContentByKeywords = async ( req, res, next ) => {

    const keywords = req.keywords

    try {

        // 1. fetch data by keywords
        const data = await Contents.find({$or: [{ title: { $regex: keywords, $options: 'i' }}]}).skip(req.data.offset).limit(req.data.limit).populate('user', 'id name')
        console.log(data.length)

        if (data.length === 0) {
            return res.status(201).json({
                message : 'failure : content not found!',
                data : []
            })
        }

        // 2. print data
        if (data) {
            return res.status(201).json({
                message : 'success : content is displayed by keywords',
                data : data.map(e => {
                    return {
                        id : e._id,
                        title : e.title,
                        content : e.content,
                        thumbnail : e.thumbnail,
                        created : e.created,
                        author : e.user,
                    }
                })
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
