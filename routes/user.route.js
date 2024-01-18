
require('dotenv').config()

const { Router } = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { UserModel } = require('../model/user.model');


const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    try {

        const { Email, Password } = req.body;

        console.log(req.body);

        if (!Email || !Password) {
            return res.status(404).send({
                isError: true,
                msg: "Kindly provide all required details"
            })
        }

        const userPresent = await UserModel.findOne({ Email })

        if (userPresent) {
            return res.status(400).send({
                isError: true,
                msg: "This Email Id is Already Registed"
            })
        }

        const hashPass = await bcrypt.hashSync(Password, 10);

        const newuser = new UserModel({
            Email, Password: hashPass
        })

        await newuser.save()

        return res.status(201).send({
            isError: false,
            msg: "Your account has been successfully registered",
            data: newuser
        })

    } catch (error) {
        return res.status(500).send({
            isError: true,
            msg: error.message
        })
    }
})



userRouter.post('/login', async (req, res) => {
    try {

        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(404).send({
                isError: true,
                msg: "Kindly provide all required details"
            })
        }

        const userPresent = await UserModel.findOne({ Email })

        if (!userPresent) {
            return res.status(404).send({
                isError: true,
                msg: "Invalid Credentials.(Email Not Found)"
            })
        }

        const ismatch = bcrypt.compareSync(Password, userPresent.Password);

        if (!ismatch) {
            return res.status(400).send({
                isError: true,
                msg: "Invalid Credentials ( Password not matched )"
            })
        }

        const token = jwt.sign({ UserId: userPresent._id }, process.env.SECREAT_KEY, { expiresIn: '24hr' })

        return res.status(201).send({
            isError: false,
            msg: "Login Successfull",
            token
        })

    } catch (error) {
        return res.status(500).send({
            isError: true,
            msg: error.message
        })
    }
})


module.exports = {
    userRouter
}