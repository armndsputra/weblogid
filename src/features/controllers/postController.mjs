import chalk from 'chalk'

// Model
import Post from '../models/postModel.mjs'

// --------------------------------------------------------------------------------------
// fatch all content data
// --------------------------------------------------------------------------------------
export const fetchAllContent = async ( req, res ) => {
    
    try {

        // 1. fetch all
        const data = await Post.find()
        .skip(req.data.offset)
        .limit(req.data.limit)
        .populate('user', 'id name')
        .exec()
        console.log('-------------------- Fetch All Content  -------------------------------')
        console.log(chalk.blueBright(`Fetch All Content Data - Count : ${data.length}`))
        console.log('------------------------------------------------------------------------')
        // 2. print content data
        if (data) {
            return res.status(200).json({
                success : true,
                message : 'success : content successfully displayed',
                data : data.map(e => {
                    return {
                        id : e._id,
                        title : e.title,
                        content : "hidden",
                        thumbnail : e.thumbnail,
                        createdAt : e.createdAt,
                        author : e.user,
                    }
                })
            })
        }

    } catch (err) {
        // handle errors
        console.error(err)
        return res.status(500).json({
            success : false,
            message : 'error processing fetch all content data!',
        })
    }
}

// --------------------------------------------------------------------------------------
//  save content data
// --------------------------------------------------------------------------------------
export const saveContent = async ( req, res ) => {
    
    try {

        // 1. save a single document
        const content = new Post(req.data)

        // 2. print the results
        const data = await (await content.save()).populate('user', 'id name')
        if (data) return res.status(201).json({
            success : true,
            message : 'success : content created successfully',
            data : {
                id : data._id,
                title : data.title,
                content : data.content,
                thumbnail : data.thumbnail,
                createdAt : data.createdAt,
                author : data.user,
            }
        })
       
    } catch(err) {
        // handle errors
        console.log(err)
        return res.status(500).json({ 
            success : false,
            message : 'error processing insert content data!'
         })
    }
}

// --------------------------------------------------------------------------------------
// remove content data
// --------------------------------------------------------------------------------------
export const deleteContent = async ( req, res) => {

     try {
        
        const id = req.data.id

        // 1. remove data by ID
        const data = await Post.findByIdAndDelete(id).populate('user', 'id name')

        // 2. print content data
        if (data) {
            return res.status(200).json({
                success : true,
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
            success : false,
            message : 'error processing delete content data!',
        })
    }
}

// --------------------------------------------------------------------------------------
// edit / update content data
// --------------------------------------------------------------------------------------
export const updateContent = async ( req, res) => {

    try {
        
        // 1. update data by ID
        const data = await Post.findByIdAndUpdate(req.id, req.data, { new: true }).populate('user', 'id name')
        
        // 2. print the data
        return res.status(201).json({
            success : true,
            message : 'success : content successfully updated',
            data : {
                id : data._id,
                title : data.title,
                content : data.content,
                thumbnail : data.thumbnail,
                createdAt : data.createdAt,
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

// --------------------------------------------------------------------------------------
// fetch content data by id
// --------------------------------------------------------------------------------------
export const fetchContentByID = async ( req, res ) => {

    const id = req.id

    try {

        // 1. fetch data by ID
        const data = await Post.findById({_id : id}).populate('user', 'id name').exec()
        console.log(data)

        // 2. print data
        if (data) return res.status(200).json({
            success : true,
            message : 'success : content is displayed by ID',
            data : {
                id : data._id,
                title : data.title,
                content : data.content,
                thumbnail : data.thumbnail,
                createdAt : data.createdAt,
                author : data.user,
            }
        })
        
        // 2.1 if data not found
        if (!data) return res.status(200).json({
            success : true,
            message : 'failure : content not found!',
            data : []
        })

        return

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            success : false,
            message : 'error processing fetch content data by ID!',
        })
    }

}

// --------------------------------------------------------------------------------------
// fetch content data by keywords
// --------------------------------------------------------------------------------------
export const fetchContentByKeywords = async ( req, res, next ) => {

    const keywords = req.keywords

    try {

        // 1. fetch data by keywords
        const data = await Post.find({$or: [{ title: { $regex: keywords, $options: 'i' }}]}).skip(req.data.offset).limit(req.data.limit).populate('user', 'id name')
        console.log(data.length)

        if (data.length === 0) {
            return res.status(201).json({
                success : true,
                message : 'failure : content not found!',
                data : []
            })
        }

        // 2. print data
        if (data) {
            return res.status(201).json({
                success : true,
                message : 'success : content is displayed by keywords',
                data : data.map(e => {
                    return {
                        id : e._id,
                        title : e.title,
                        content : "hidden",
                        thumbnail : e.thumbnail,
                        createdAt : e.createdAt,
                        author : e.user,
                    }
                })
            })
        }

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).json({
            success : false,
            message : 'error processing fetch content data by keywords!',
        })
    }

}

// fetch all content by user ID
export const fetchAllContentByUserId = async ( req, res ) => {
    
    try {

        const userId = req.id

        // 1. fetch all
        const data = await Post.find({ user: userId }).skip(req.pagination.offset).limit(req.pagination.limit).populate('user', 'id name').exec()
        console.log(data)
        // 2. print content data
        if (data) {
            return res.status(200).json({
                success : true,
                message : 'success : content successfully displayed',
                data : data.map(e => {
                    return {
                        id : e._id,
                        title : e.title,
                        content : "hidden",
                        thubnail : e.thumbnail,
                        createdAt : e.createdAt,
                        author : e.user,
                    }
                })
            })
        }

    } catch (err) {
        // handle errors
        console.error(err)
        return res.status(500).json({
            message : 'error in fetch all content by user ID'
        })
    }
}
