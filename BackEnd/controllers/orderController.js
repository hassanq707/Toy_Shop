const ORDER = require('../models/orderModel');
const USER = require('../models/userModel');
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {
  const { items, amount, address, discount } = req.body;
  const frontend_url = process.env.FRONTEND_URL;

  try {
    const newOrder = await ORDER.create({
      userId: req.userId,
      items,
      amount,
      address,
    });

    if (!newOrder)
      return res.json({ success: false, message: "Error placing order" });

    const user = await USER.findByIdAndUpdate(req.userId, {
      $set: { cart: {} },
    });

    if (!user)
      return res.json({ success: false, message: "Error removing cart" });

    let discountedItems = items;
    if (discount && discount > 0) {
      discountedItems = items.map((item) => {
        const discountedPrice = item.price - (item.price * discount) / 100;
        return { ...item, price: discountedPrice };
      });
    }

    const line_items = discountedItems.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "pkr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
      message: "Order placed successfully",
    });

  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ success: false, message: "Payment gateway error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await ORDER.findByIdAndUpdate(orderId,
        {
          $set: {
            payment: true
          }
        },
        { new: true }
      )
      res.json({ success: true, message: "Paid" })
    } else {
      await ORDER.findByIdAndDelete(orderId)
      res.json({ success: false, message: "Not Paid" })
    }
  }
  catch (err) {
    res.json({ success: false, message: "Error verifying order" })
  }
}

const userOrders = async (req,res) => {
  try {
    const orders = await ORDER.find({userId : req.userId})
    res.json({ success: true, orders })
  }
  catch (err) {
    res.json({ success: false, message: "Error verifying order" })
  }
}

const listOrders = async (req,res) => {
  try {
    const orders = await ORDER.find({})
    res.json({ success: true, orders })
  }
  catch (err) {
    res.json({ success: false, message: "Error Fetching orders" })
  }
}

const updateStatus = async (req,res) => {
  try {
    await ORDER.findByIdAndUpdate(req.body.orderId,
      {$set : {
        status : req.body.status
      }}
    )
    res.json({ success: true , message : "Status Updated"})
  }
  catch (err) {
    res.json({ success: false, message: "Error Updating Status" })
  }
}

module.exports = {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
};
