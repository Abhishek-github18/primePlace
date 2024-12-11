const reattachCookie = (req, res, next) => {
    if (req.cookies.token) {
      res.cookie("token", req.cookies.token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    next();
  };

  export default reattachCookie;