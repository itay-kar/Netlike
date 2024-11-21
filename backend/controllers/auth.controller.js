import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const emailRegex = /^[^\s]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const userName = await User.findOne({ username: username });

    if (userName) {
      return res.status(400).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash_password = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/Avatar1.png", "/Avatar2.png", "/Avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username,
      email,
      password: hash_password,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error on signup controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Please fill all fields"});
    }

    const user = await User.findOne({email:email});
    if (!user){
        return res.status(404).json({message:"Invalid credentials"});
    }

    const isPasswordCorrect = await bcryptjs.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }

    generateTokenAndSetCookie(user._id,res);

    res.status(200).json({
        success:true,
        user:{
            ...user._doc,
            password:""
        }
    });
  }

  catch{
    console.log("Error on login controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
}
}

export async function logout(req, res) {
  try {
    res.clearCookie("netoken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error on logout controller ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
