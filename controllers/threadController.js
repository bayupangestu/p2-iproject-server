const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// use `prisma` in your application to read and write data in your DB

class ThreadController {
  static async getThread(req, res, next) {
    try {
      const threadData = await prisma.thread.findMany({});
      res.status(200).json(threadData);
    } catch (err) {
      next(err);
    }
  }
  static async addThread(req, res, next) {
    try {
      const { title, content, imageUrl } = req.body;
      const { userId } = req.userLogin;
      if (!title)
        throw {
          name: "Invalid input",
          message: "Title is required",
        };
      if (!content)
        throw {
          name: "Invalid input",
          message: "Content is required",
        };
      if (!imageUrl)
        throw {
          name: "Invalid input",
          message: "Image URL is required",
        };
      const threadData = await prisma.thread.create({
        data: {
          title,
          content,
          imageUrl,
          userId,
        },
      });
      res.status(201).json({
        message: "Create Thread Success!",
        threadData,
      });
    } catch (err) {
      next(err);
    }
  }
  static async detailThread(req, res, next) {
    try {
      const { id } = req.params;
      const dataDetail = await prisma.thread.findUnique({
        where: {
          id: +id,
        },
        include: {
          post: true,
        },
      });
      res.status(200).json(dataDetail);
      try {
      } catch (err) {}
    } catch (err) {
      next(err);
    }
  }
  static async updateThread(req, res, next) {
    const { id } = req.params;
    const { title, content, imageUrl } = req.body;
    try {
      await prisma.thread.update({
        where: {
          id: +id,
        },
        data: {
          title,
          content,
          imageUrl,
        },
      });
      const thread = await prisma.thread.findUnique({
        where: {
          id: +id,
        },
      });
      if (!thread) throw { name: "Not Found", message: `Thread with id ${id} not found` };
      res.status(201).json({
        message: "Edit Thread Success!",
        data: thread,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteThread(req, res, next) {
    const { id } = req.params;
    try {
      const thread = await prisma.thread.findUnique({
        where: {
          id: +id,
        },
      });
      if (!thread) throw { name: "Not Found", message: `Thread with Id ${id} not found` };
      await prisma.thread.delete({
        where: {
          id: +id,
        },
      });
      res.status(200).json({
        message: `${thread.title} has been deleted!`,
        data: thread,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ThreadController;
