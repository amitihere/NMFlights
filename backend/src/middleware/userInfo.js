const signupMiddle = (req,res,next) => {
    const {username,email,phone,password} = req.body
    console.log("middle")

    function isValid(value) {
        return /^[a-zA-Z0-9]+$/.test(value);
    }
    if(!username || !email || !phone || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    if(username.trim().length < 3 || !isValid(username.trim())){
        return res.status(400).json({message: "Username must be at least 3 characters and contain only alphanumeric characters"})
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: "Invalid email format"})
    }
    if(phone.trim().length != 10){
        return res.status(400).json({message: "Phone number must be 10 digits"})
    }

    next()
}
const loginMiddle = (req,res,next) => {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"})
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).json({message: "Invalid email format"})
    }

    next()
}
module.exports = {signupMiddle,loginMiddle}