// npm
import  express  from 'express'
const app = express()
import morgan from 'morgan'
import pkg from 'body-parser'
const {urlencoded , json} = pkg
import 'dotenv/config'

// routes
import postal from'./src/features/routes/postalRoute.mjs'
import user from'./src/features/routes/userRoute.mjs'
import register from './src/features/routes/registerRoute.mjs'
import login from './src/features/routes/loginRoute.mjs'

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

// routes
app.use('/postal', postal)

app.use('/user', user)
app.use('/register', register)
app.use('/login', login)

// error handling
app.use((req, res, next) => {
    const error = new Error('the page you are looking for was not found')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    // console.log(err)
    res.status(err.status || 500).json({
        message : err.message
    })
})

export default app