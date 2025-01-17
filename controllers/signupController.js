const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

const registerNewUser = async(request, response) => {
    const encryptedPassword = await bcrypt.hash(request.body.password, 10)

    const user = new userModel({
        firstName : request.body.firstName,
        lastName : request.body.lastName,
        email : request.body.email,
        password : encryptedPassword
    })
    try{
        const existingUser = await userModel.findOne({email : request.body.email})
        if(existingUser)
        {
            return response.status(409).send({message : `Already existing user!!`})
        }
        const newUser = await user.save()
        return response.status(201).json(newUser)
    }
    catch(error)
    {
        response.status(500).send({message: error.message})
    }
}

module.exports = {registerNewUser}