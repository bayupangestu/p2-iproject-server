const threadRouter = require("express").Router();
const authN = require("../middlewares/authentication");
const ThreadController = require("../controllers/threadController");

threadRouter.post("/", authN, ThreadController.addThread);
threadRouter.get("/:id", ThreadController.detailThread);
threadRouter.put("/:id", authN, ThreadController.updateThread);
threadRouter.delete("/:id", authN, ThreadController.deleteThread);
module.exports = threadRouter;
