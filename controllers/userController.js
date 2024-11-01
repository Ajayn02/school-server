const users = require('../Models/userModel')
const jwt=require('jsonwebtoken')

exports.userRegistration = async (req, res) => {
    try {
        const { username, password, email } = req.body
        if (!username || !password || !email) {
            res.status(400).json("Invalid Data")
        } else {
            const newUser = new users({
                username, password, email
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json("Invalid Data")
        } else {
            const existing = await users.findOne({ email, password })
            if (existing) {
                const token=jwt.sign({userId:existing._id},process.env.SECRET_KEY)
                res.status(200).json({token,username:existing.username})
            } else {
                res.status(400).json("Invalid email or Password")
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
    
}