
const express = require('express');

const cors = require('cors')

const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.route');
const { empRouter } = require('./routes/employee.route');



const app = express()

const PORT = process.env.PORT || 8080;

app.use(express.json())

app.use(cors())

app.use('/', userRouter)

app.use('/employees', empRouter)


app.listen(PORT, async () => {
    try {
        await connection
        console.log('DB connected');
    } catch (error) {
        console.log(error);
    }
    console.log('server is runnning on port ', PORT);
})