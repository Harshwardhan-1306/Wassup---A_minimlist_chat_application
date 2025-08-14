import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;
        // Validate input
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
            generateToken(newUser._id, res);
            await newUser.save();

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

export const login = (req, res) => {
    res.send("login routes");
};

export const logout = (req, res) => {
    res.send("logout routes");
};
