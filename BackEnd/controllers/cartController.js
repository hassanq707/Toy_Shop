const USER = require('../models/userModel')

const addRemoveToCart = async (req, res) => {
    try {
      const { itemId, action } = req.body;
  
      const incValue = action === 'add' ? 1 : action === 'remove' ? -1 : 0;
  
      if (incValue === 0){
        return res.status(400).json({ success: false, message: "Invalid action" });
      }
  
      const user = await USER.findByIdAndUpdate(
        req.userId,
        { $inc: { [`cart.${itemId}`]: incValue } },
        { new: true }
      );
  
      if (user.cart[itemId] <= 0) {
        await USER.findByIdAndUpdate(
          req.userId,
          { $unset: { [`cart.${itemId}`]: "" } },
          { new: true }
        );
      }
  
      res.json({ success: true, message: "Cart updated" });
    } catch (err) {
      console.error(err);
      res.json({ success: false, message: "Server error" });
    }
  };
  

const getCart = async(req,res) => {
   try{
     const user = await USER.findById(req.userId)
     let cartData = await user.cart;
     res.json({ success: true, cartData });
   }catch(err){
     console.error(err);
     res.json({ success: false, message: "Server error" });
   }
}

const removeCartItem = async (req, res) => {
  try {
    await USER.findByIdAndUpdate(req.userId, {
      $unset: {
        [`cart.${req.body.id}`]: ""
      }
    });
    res.json({ success: true, message: "Cart item removed" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
};


module.exports = {
    addRemoveToCart,
    getCart,
    removeCartItem
}