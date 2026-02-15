import multer from 'multer'
import fs from 'fs'
import path from 'path'

export class UploadPicture {

    addFileUploadMiddleware(pathToFile) {

        async function ensureUploadDir() {
            const dir = path.join(process.cwd(), pathToFile)
            try {
                await fs.promises.access(dir)
            } catch (error) {
                await fs.promises.mkdir(dir, { recursive: true })
            }
        }
        ensureUploadDir()

        // configure storage for multer
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, pathToFile) // specify the upload directory
            },
            filename: (req, file, cb) => {
                cb(null, Math.round(Math.random() * 1E9) + '.' + file.mimetype.split('/')[1]) // rename the file
            }
        })

        // configure filter
        const fileFilter = (req, file, cb) => {
            const mimetype = file.mimetype
            if (mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "image/jpg") {
                cb(null, true)
            } else {
                cb(null, false)
            }
        }

        return multer({ storage, fileFilter, limits: {
            fileSize: 1024 * 1024, // 1MB limit
        }})

    }
  
}