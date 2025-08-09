const { getUser } = require("../service/token");

const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res.json({ success: false, message: "Login First to Proceed" });

    const user = getUser(token); 

    if (!user)
      return res.json({ success: false, message: "Not Authorized, Login again" });

    req.userId = user.id;
    next();
  } catch (err) {
    return res.json({ success: false, message: "Server Error" });
  }
};

module.exports = {
  authMiddleware,
};
