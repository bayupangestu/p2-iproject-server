const concertRouter = require("express").Router();
const ApiContoller = require("../controllers/apiContoller");

concertRouter.get("/concerts", ApiContoller.getConcert);
concertRouter.get("/news", ApiContoller.getNews);
concertRouter.post("/xendit", ApiContoller.addXendit);

module.exports = concertRouter;
