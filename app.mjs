// npm
import  express  from 'express'
const app = express()
import morgan from 'morgan'
import pkg from 'body-parser'
const {urlencoded , json} = pkg
import 'dotenv/config'
import chalk from 'chalk'

import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------- ROUTES IMPORTS --------------------------
// routes
import post from'./src/features/routes/postRoute.mjs'
import user from'./src/features/routes/userRoute.mjs'
import register from './src/features/routes/registerRoute.mjs'
import login from './src/features/routes/loginRoute.mjs'
import commenter from './src/features/routes/commenterRoute.mjs'

import gallery from './src/features/routes/galleryRoute.mjs'

// traffic monitoring
import trafficLog from './src/features/routes/trafficLogRoute.mjs'
import traffic from './src/features/routes/trafficRoute.mjs'

// database statistics
import database from './src/features/routes/databaseStatsRoute.mjs'

// cors
import cors from './src/features/routes/corsRoute.mjs'

// -------------------------- END OF ROUTES IMPORTS --------------------------

// middlewares  
app.use(cors)

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

// traffic monitoring middleware
app.use(trafficLog)

// routes
app.use('/api/post', post) // post route
app.use('/api/upload/gallery', gallery) // gallery images static route

app.use('/api/commenter', commenter) // commenter route

app.use('/api/account/user', user) // user route
app.use('/api/account/login', login) // login route
app.use('/api/account/register', register) // register route

app.use('/api/traffic', traffic)

// database statistics route
app.use('/api/database/stats', database)

// static route to index.html
app.use((req, res, next) => {
    console.log('-------------------------------------------------------')
    console.log("Path URL: " + req.path)
    console.log('-------------------------------------------------------')
    // Skip API routes
    if (req.path.startsWith('/api')) {
        return next();
    }
    
    // Skip static files (sudah di-handle express.static)
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        return next();
    }
    
    // Send React index.html
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// error handling
app.use((req, res, next) => {
    const error = new Error('the page you are looking for was not found')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    // console.log(err)
    // console.error(chalk.red(err.stack))
    console.log('----- error handler called -----')
    console.error(chalk.red(err.message))
    console.log('------------------------------')
    if (err.message === 'File too large') {
        return res.status(400).json({
            success : false,
            message : 'file is too large!. Max 1MB!'
        })
    }
    // returndd
    if (err.message) {
        return res.status(err.status || 500).json({
            success : false,
            // message : 'Enter the image file key correctly as "thumbnail"'
            message : err.message})
    }
    return res.status(err.status || 500).json({
        // message : err.message,
        message: 'error in processing your request',
    })
})

export default app