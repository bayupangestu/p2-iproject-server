const concertRouter = require("express").Router();
const ApiContoller = require("../controllers/apiContoller");

concertRouter.get("/concerts", ApiContoller.getConcert);
concertRouter.get("/news", ApiContoller.getNews);

module.exports = concertRouter;
