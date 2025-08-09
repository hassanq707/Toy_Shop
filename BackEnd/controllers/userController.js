const USER = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { setUser } = require('../service/token');
const fileType = require('file-type');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await USER.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Email already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter valid email" });
        }
        if (!validator.isStrongPassword(password, {
            minLength: 7,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            return res.json({ success: false, message: "Password not strong enough" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const user = await USER.create({ name, email, password: hashPass });
        const token = setUser(user);
        res.json({ success: true, token, name });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating user" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await USER.findOne({ email });
        if (!user) return res.json({ success: false, message: "Email/Password is wrong" });
        const isMatchPass = await bcrypt.compare(password, user.password);
        if (!isMatchPass) return res.json({ success: false, message: "Email/Password is wrong" });

        const token = setUser(user);
        res.json({ success: true, token, name: user.name, role: user.role });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error in Login" });
    }
};

const saveProfile = async (req, res) => {
    try {
        const user = await USER.findById(req.userId);

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        user.image = req.file.buffer;
        user.imageMimeType = req.file.mimetype;

        await user.save();

        const base64Image = `data:${user.imageMimeType};base64,${user.image.toString("base64")}`;

        res.json({
            success: true,
            message: "Profile image saved successfully",
            image: base64Image,
        });

    } catch (err) {
        console.error("Error in saveProfile:", err);
        res.json({ success: false, message: "Server error" });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await USER.findById(req.userId, { image: 1, imageMimeType: 1 });

        if (!user || !user.image || !user.imageMimeType) {
            return res.json({ success: true, image: null });
        }

        const base64Image = `data:${user.imageMimeType};base64,${user.image.toString("base64")}`;
        res.json({ success: true, image: base64Image });

    } catch (err) {
        console.error("Error in getProfile:", err);
        res.json({ success: false, message: "Server error" });
    }
};

module.exports = {
    loginUser,
    registerUser,
    saveProfile,
    getProfile
};