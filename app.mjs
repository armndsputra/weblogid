// npm
import  express  from 'express'
const app = express()
import morgan from 'morgan'
import pkg from 'body-parser'
const {urlencoded , json} = pkg
import 'dotenv/config'

// routes
import post from'./src/features/routes/postRoute.mjs'
import user from'./src/features/routes/userRoute.mjs'
import register from './src/features/routes/registerRoute.mjs'
import login from './src/features/routes/loginRoute.mjs'
import commenter from './src/features/routes/commenterRoute.mjs'

// middlewares  
app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

// routes
app.use('/api/post', post) // post route
app.use('/api/commenter', commenter) // commenter route

app.use('/api/account/user', user) // user route
app.use('/api/account/login', login) // login route
app.use('/api/account/register', register) // register route

// error handling
app.use((req, res, next) => {
    const error = new Error('the page you are looking for was not found')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    console.log(err)
    console.error(err.message)
    // returndd
    if (err.message) {
        return res.status(err.status || 500).json({
            success : false,
            // message : 'Enter the image file key correctly as "thumbnail"'
            message : err.message})
    }
    res.status(err.status || 500).json({
        // message : err.message,
        message: 'error system!'
    })
})

export default app