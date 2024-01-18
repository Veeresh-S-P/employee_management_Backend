
require('dotenv').config()

const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1]

        const decoded = jwt.verify(token, process.env.SECREAT_KEY)

        if (!decoded) {
            return res.status(401).send({
                isError: true,
                msg: "Kindly Login"
            })
        } else {
            next()
        }

    } catch (error) {

        return res.status(401).send({
            isError: true,
            msg: error.message
        })

    }

}



module.exports = {
    auth
}