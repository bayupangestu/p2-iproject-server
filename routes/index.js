const router = require("express").Router();
const threadRoutes = require("./threadRoutes.js");
const concertRoutes = require("./concertRoutes");
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/", ThreadController.getThread);
router.use("/api", concertRoutes);
router.use("/threads", threadRoutes);
module.exports = router;
