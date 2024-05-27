const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const JWT_TOKEN = 'ashbkjcxhuiaklworuybsskhuie'

const displayUserData = async(request, response) => {
    const {token} = request.body
    try
    {
        const loggedInUser = jwt.verify(token, JWT_TOKEN)
        const loggedInUserEmail = loggedInUser.email
        const authenticatedUser = await userModel.findOne({email : loggedInUserEmail})
        if(authenticatedUser)
        {
            return response.status(200).json(authenticatedUser)
        }
        response.status(400).send({message : 'Something went wrong..Try again later..'})
    }
    catch(error)
    {
        response.status(500).send({message: error.message})
    }
}

module.exports = {displayUserData}