const threadRouter = require("express").Router();
const authN = require("../middlewares/authentication");
const ThreadController = require("../controllers/threadController");
const PostController = require("../controllers/postController");

threadRouter.post("/", authN, ThreadController.addThread);
threadRouter.get("/:id", ThreadController.detailThread);
threadRouter.put("/:id", authN, ThreadController.updateThread);
threadRouter.delete("/:id", authN, ThreadController.deleteThread);
threadRouter.post("/:id/posts", authN, PostController.addPost);
threadRouter.put("/:id/posts/:postId", authN, PostController.updatePost);
threadRouter.delete("/:id/posts/:postId", authN, PostController.deletePost);

module.exports = threadRouter;
