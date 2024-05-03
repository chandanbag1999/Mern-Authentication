import express from 'express'
import cookieParser from 'cookie-parser'


const app = express()

app.use(express.json())
app.use(cookieParser())



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