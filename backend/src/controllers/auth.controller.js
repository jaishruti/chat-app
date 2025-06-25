import { generateToken } from "../config/utils";
import User from "../models/user";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All field are required" });
        }
        if (password.length < 6) {
        return res
            .status(400)
            .json({ message: "password must be atleast 6 charcters" });
        }
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "Email already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
        fullName,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        });
        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        });
    }  catch (err) {
    console.error("Error while signup", error.message);
    res.status(500).json({ message: "Internal error while signup" });
  }
};
