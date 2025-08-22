const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("./Models/User");

// ========================= SIGNUP =========================
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        console.error("Signup Error:", err.message);   // 👈 log error in backend
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// ========================= LOGIN =========================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: email or password is wrong';

        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // compare password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // generate JWT
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // send response
        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Login Error:", err.message);   // 👈 log error in backend
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
