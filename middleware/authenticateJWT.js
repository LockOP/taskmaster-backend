const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      // Attach userId and email to the request object
      req.user = {
        userId: user.userId,
        email: user.email,
      };

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
