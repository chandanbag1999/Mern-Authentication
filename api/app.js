import express from 'express'


const app = express()

app.use(express.json())



// route import
import userRoute from './routes/user.route.js'


// route decleration
app.use('/api/v1/users', userRoute)

export default app