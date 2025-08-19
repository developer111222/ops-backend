const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


//-----------------------------user registration----------------------------------

exports.usersignup = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password, username } = req.body;

        // Validate inputs
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });

        await newUser.save();

        res.status(201).json({ message: "User successfully signed up" });
    } catch (error) {
        next(error); // Pass error to error middleware
    }
};



//-----------------------------user login----------------------------------

exports.userlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        // Set cookie and respond
       return res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            secure: false,       // <--- changed
            sameSite: 'lax'    
        }).status(200).json({ message: "Login successful" });
        
    } catch (error) {
        next(error); // Pass error to error middleware
    }
};


//--------------------------------------get profile-------------------------------------

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('username email role');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        next(error); // Pass error to error middleware
    }
};



//----------------------------------user logout------------------------------

exports.userlogout = (req, res, next) => {
    try {
        res.clearCookie('token', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            expires: new Date(0) // Needed in some browsers
          });
          
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        next(error); // Pass error to error middleware
    }
};