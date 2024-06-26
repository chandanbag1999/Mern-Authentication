import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
// import cors from 'cors'


const __dirname = path.resolve()

const app = express()


// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials: true
// }))

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/client/dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/dist/index.html'))
})



// route import
import userRoute from './routes/user.route.js'


// route decleration
app.use('/api/v1/users', userRoute)




app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });

export default app