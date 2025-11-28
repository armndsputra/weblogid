import { createServer } from 'node:http'
import app from './app.mjs';
import { connectMongodb } from './configs/mongodb.mjs'

const port = process.env.PORT || 3000

const startServer = async () => {

    try {

        await connectMongodb()
    
        const server = createServer(app)
        server.listen(port, () => {
            console.log(`server running on port ${port}`)
        })

    } catch (err) {
        console.error('Failed to start server: ', err)
        process.exit(1)
    }

}

startServer().catch(err => {
    console.error("failed to start server :", err)
})