import { body, validationResult } from 'express-validator'

// Helper
import { __file_remove } from "../../../../../helpers/__file_remove.mjs"

// Model
import Contents from '../../../../models/postalModel.mjs'

export const processContentData = async ( req, res, next ) => {

    let thumbnailPaths = [] // empty array

    try {

        // MAIN ACCESS USER
        const idUser = req.decode.id

        // 1. Organize file paths into an array
        if (req.files && req.files.length > 0) {
            thumbnailPaths = req.files.map(file => file.path)
        }

        // 2.1 check the sent data and validation rules
        await Promise.all([
                body('title').notEmpty().withMessage('title is required!').run(req),
                body('content').notEmpty().withMessage('content is required!').run(req)
            ])

        // 2.2 if the data does not meet the requirements, the uploaded file will be deleted
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });

            console.error('validation errors :', errors.array())
            return res.status(422).json({
                message: 'validation failed!',
                errors: errors.array(),
                receivedData: req.body
            });

        }
        
        // 3. if file path > 0 have to remove
        if (thumbnailPaths.length > 1) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('Operation result:', result)
                }).catch(error => {
                    console.error('Operation failed:', error)
                });
            return res.status(413).json({ message : 'only one file is allowed'})
        }

        // 4. Check if a file was uploaded
        if (!req.files || req.files.length === 0) {
            console.error('file has not been uploaded!')
            return res.status(400).json({ message: 'file is required!' })
        }

        // 5. check if the data already exists
        const title = await Contents.findOne({ title : req.body.title})
        console.table(title)
        if (title) { 
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                })
            return res.status(404).json({ message : 'the title entered is the same'})
        }

        // 6. The result of the data sent to the request body
        const data = {
            user : idUser,
            created : new Date(),
            title : req.body.title,
            content : req.body.content,
            thumbnail : thumbnailPaths[0]
        }

        // 7. data has been verified
        req.data = data
        console.table(data)
        next()

    } catch (err) {
        
        // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }
}