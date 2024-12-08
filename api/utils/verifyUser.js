import jwt from "jsonwebtoken";
export const verifyUser = (req, res, next) => {
  console.log("req.cookies", req.cookies);
  try {
    const token = req.cookies.token;
    console.log("token", token);

    if (!token) return res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
    jwt.verify(token, process.env.SecretKey, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = user;
      next();
      return;
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
    return;
  }
};
