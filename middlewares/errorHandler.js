const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.code) {
    case "P2002":
      res.status(400).json({
        message: "A new user cannot be created with this email / username",
      });
    case "Invalid email / password":
    case "Invalid input":
      res.status(400).json({
        message: err.message,
      });
      break;
    case "JsonWebTokenError":
    case "TokenExpiredError":
    case "Unauthorized":
    case "Invalid Token":
      res.status(401).json({
        message: err.message,
      });
      break;
    case "Forbidden":
      res.status(403).json({
        message: err.message,
      });
      break;
    case "Not Found":
    case "Empty List":
      res.status(404).json({
        message: err.message,
      });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandler;
