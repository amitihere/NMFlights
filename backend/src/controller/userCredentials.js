const {createNewUser,loginUser} = require("../services/userData")
const signupController = async (req,res) => {

    const {username,email,phone,password} = req.body

    try{
        const completeData = {username,email,phone,password}
        const newUser = await createNewUser(completeData)
        return res.status(201).json({message: "User created successfully", user: newUser})
    }catch(err){
        res.status(500).json({message: "Error creating user",error:err.message})
    }
}
const loginController = async (req,res) => {
    const {email,password} = req.body

    try{
        const completeData = {email,password}
        const loginUserData = await loginUser(completeData)
        return res.status(200).json({message: "User logged in successfully", user: loginUserData})
        
    }catch(err){
        res.status(500).json({message: "Error logging in user",error:err.message})
    }
}
module.exports = {signupController,loginController}