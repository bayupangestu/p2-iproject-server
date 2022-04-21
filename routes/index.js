const router = require("express").Router();
const threadRoutes = require("./threadRoutes.js");
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use("/threads", threadRoutes);

module.exports = router;
