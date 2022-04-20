const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PostController {
  static async getPost(req, res, next) {
    try {
      const { id } = req.params;
      const postData = await prisma.post.findMany({
        where: {
          threadId: +id,
        },
        include: { user: true },
      });
      if (!postData) throw { name: "Not Found", message: `Post with id ${id} not found` };
      res.status(200).json({
        message: "Get post success!",
        data: postData,
      });
    } catch (err) {
      next(err);
    }
  }
  static async addPost(req, res, next) {
    try {
      const { title, body } = req.body;
      const { userId } = req.userLogin;
      const { id } = req.params;
      if (!title) throw { name: "Invalid Input", message: "Title is required" };
      if (!body) throw { name: "Invalid Input", message: "Body is required" };
      const postData = await prisma.post.create({
        data: {
          title,
          body,
          userId: +userId,
          threadId: +id,
        },
      });
      res.status(201).json({
        message: "Create Post Success!",
        postData,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async updatePost(req, res, next) {
    const { threadId, postId } = req.params;
    const { title, body } = req.body;
    try {
      const postData = await prisma.post.findUnique({
        where: {
          id: +postId,
        },
      });
      if (!postData) throw { name: "Not Found", message: `Post Id with ${id} not found` };
      res.status(201).json({
        message: "Edit post success!",
      });
      await prisma.post.update({
        where: {
          id: +postId,
        },
        data: {
          title,
          body,
          threadId,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deletePost(req, res, next) {
    const { postId } = req.params;
    console.log(postId);
    try {
      const postData = await prisma.post.findUnique({
        where: {
          id: +postId,
        },
      });
      if (!postData) throw { name: "Not Found", message: `Post with id ${postId} not found` };
      await prisma.post.delete({
        where: {
          id: +postId,
        },
      });
      res.status(200).json({
        message: `${postData.title} has been deleted!`,
        data: postData,
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = PostController;
