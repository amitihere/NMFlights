const nodemailer = require("nodemailer");
require("dotenv").config()
const {createNewUser,loginUser} = require("../services/userData")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const signupController = async (req,res) => {

    const {username,email,phone,password} = req.body

    try{
        const completeData = {username,email,phone,password}
        const newUser = await createNewUser(completeData)

        // Send welcome email in the background — don't let it block signup
        transporter.sendMail({
          from: `"NMFlights ✈️" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Welcome to NMFlights ✈️",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #1a73e8;">Welcome to NMFlights ✈️</h2>
            <p>Hi ${newUser.username || "Traveler"},</p>
            <p>Thanks for signing up with NMFlights! Your account has been created successfully.</p>
            <p>You're all set to explore and track flights around the world.</p>
            <hr style="margin: 20px 0;" />
            <p style="margin-top: 20px;">
                Safe Travels,<br/>
                <strong>Team NMFlights ✈️</strong>
            </p>
            </div>
          `,
        }).catch(mailErr => console.error("Welcome email failed:", mailErr.message));

        return res.status(201).json({message: "User created successfully", user: newUser})
    }catch(err){
        // Distinguish duplicate user from other errors
        if (err.message && err.message.includes("already exists")) {
            return res.status(409).json({message: err.message})
        }
        res.status(500).json({message: "Error creating user",error:err.message})
    }
}
const loginController = async (req,res) => {
    const {email,password} = req.body

    try{
        const completeData = {email,password}
        const loginUserData = await loginUser(completeData)

        // Send login notification email in the background
        transporter.sendMail({
          from: `"NMFlights ✈️" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Welcome Back to NMFlights ✈️",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #1a73e8;">Welcome Back to NMFlights ✈️</h2>
            <p>Hi ${loginUserData.username || "Traveler"},</p>
            <p>We noticed a successful login to your NMFlights account.</p>
            <p>If this was you — great! You're all set to explore and book your next journey.</p>
            <hr style="margin: 20px 0;" />
            <p style="font-size: 14px; color: #777;">
                If you did NOT log in, please reset your password immediately or contact support.
            </p>
            <p style="margin-top: 20px;">
                Safe Travels,<br/>
                <strong>Team NMFlights ✈️</strong>
            </p>
            </div>
          `,
        }).catch(mailErr => console.error("Login email failed:", mailErr.message));

        return res.status(200).json({message: "User logged in successfully", user: loginUserData})
        
    }catch(err){
        // Return 401 for authentication failures instead of 500
        if (err.message && (err.message.includes("does not exist") || err.message.includes("password"))) {
            return res.status(401).json({message: err.message})
        }
        res.status(500).json({message: "Error logging in user",error:err.message})
    }
}
module.exports = {signupController,loginController}