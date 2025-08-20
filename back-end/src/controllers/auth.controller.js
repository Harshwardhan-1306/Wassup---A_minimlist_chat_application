import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.lib.js";

export const signup = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        // Validate input
        if(!email || !fullname || !password) {
            return res.status(400).json({ message: "Please fill all the fields." });
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create the new user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });

        if(newUser) {
            //jwt token
            await newUser.save();
            generateToken(newUser._id, res);
           res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            profilepic: newUser.profilepic
           })

        } else {
            res.status(201).json({
                message: "Invalid user data"
            });
        }
    } catch (error) {
        console.log("Error in sign Up controller", error.message);
        res.status(500).json({ message: "Internal server error", error});
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) return res.status(400).json({ message: "Invalid Credentials"});

        const isPass = await bcrypt.compare(password, user.password);

        if(!isPass) {
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        generateToken(user._id, res);

        res.status(200).json({ 
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic
        });


    } catch(error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged off Successfully"});
    } catch (error) {
        console.log("Error in Logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilepic } = req.body;
        const userId = req.user._id;

        if(!profilepic) {
            return res.status(400).json({ message: "Please provide a profile picture" });
        }
        
        const uploadResponse = await cloudinary.uploader.upload(profilepic);

        const updatedUser = await User.findByIdAndUpdate(userId, { profilepic: uploadResponse.secure_url }, {new: true});

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in updating profile picture", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in Authorization check", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
