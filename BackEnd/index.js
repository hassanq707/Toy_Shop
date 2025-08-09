require('dotenv').config()
const express = require('express')
const cors = require("cors");
const app = express()
const cookieParser = require("cookie-parser");
const { connectDB } = require('./config/DB');
const toyRouter = require("./routes/toyRoute")
const userRouter = require("./routes/userRoute")
const cartRouter = require("./routes/cartRoute")
const orderRouter = require("./routes/orderRoute")
const USER = require('./models/userModel')
const { authMiddleware } = require('./middleware/auth')

const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())


const allowedOrigins = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173'  
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'token']
}));

// Handle preflight requests
app.options('*', cors());

// Db Connection

connectDB()

// APi Endpoints

app.use('/api/toy', toyRouter)


// User Register/Login 

app.use('/api/user', userRouter)

// Cart Routes

app.use('/api/cart', cartRouter)

// order Routes

app.use('/api/order', orderRouter)


app.post('/checkPromo', authMiddleware, async (req, res) => {
    const { promo } = req.body;
    try {
        const admin = await USER.findOne({ role: "admin" });

        if (!admin) {
            return res.json({ success: false, reason: "admin", message: "Admin not found" });
        }

        const checkPromo = admin.promoCodes.find(obj => obj.name === promo);

        if (!checkPromo)
            return res.json({ success: false, reason: "invalid", message: "Promo code not found" });

        if (checkPromo.appliedUsers.includes(req.userId))
            return res.json({ success: false, reason: "used", message: "Promo code already used" });

        checkPromo.appliedUsers.push(req.userId);
        await admin.save();

        res.json({ success: true, discount: checkPromo.discount, message: "Promo applied successfully!" });

    } catch (err) {
        console.error(err);
        res.json({ success: false, reason: "server", message: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log("Server is listening to PORT: " + PORT)
})  
