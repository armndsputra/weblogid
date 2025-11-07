// npm
import  express  from 'express'
const app = express()
import morgan from 'morgan'
import pkg from 'body-parser'
const {urlencoded , json} = pkg

import 'dotenv/config'

// Database Connection
import './configs/database.mjs'

// Routes
import postal from'./src/features/routes/postal_management/postal_route.mjs'
import user from'./src/features/routes/user/user_route.mjs'

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())


// Routes
app.use('/postal', postal)
app.use('/user', user)

// Error Handling
app.use((req, res, next) => {
    const error = new Error('The page you are looking for was not found')
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