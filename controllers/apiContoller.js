let base_url_event = "https://app.ticketmaster.com/discovery/v2/events.json";
let base_url_news = "https://music-news-api.p.rapidapi.com/news";
const xendit = require("xendit-node");
const axios = require("axios");

class ApiContoller {
  static async getConcert(req, res, next) {
    try {
      const response = await axios({
        method: "GET",
        url: base_url_event,
        params: {
          apikey: process.env.SECRET_KEY_EVENT,
          classificationName: "music",
        },
      });
      const dataEvent = response.data._embedded.events.map((el) => {
        return {
          id: el.id,
          name: el.name,
          image: el.images[1].url,
          startDate: el.dates.start.localDate,
          location: el.locale,
          url: el.url,
        };
      });
      res.status(200).json(dataEvent);
    } catch (err) {
      next(err);
    }
  }
  static async getNews(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: base_url_news,
        headers: {
          "X-RapidAPI-Host": "music-news-api.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.SECRET_KEY_NEWS,
        },
      });
      res.status(200).json(data.splice(1, 17));
    } catch (err) {
      next(err);
    }
  }
  static async addXendit(req, res, next) {
    try {
      const secret = new xendit({
        secretKey: process.env.SECRET_KEY_XENDIT,
      });
      const { Invoice } = secret;
      const invoiceSpecificOptions = {};
      const invoice = new Invoice(invoiceSpecificOptions);
      let max = 2000000;
      let min = 1000000;
      const response = await invoice.createInvoice({
        externalID: "Ticket Price" + new Date(),
        amount: Math.floor(Math.random() * (max - min + 1)) + min,
        description: "Rock n Roll !",
        invoiceDuration: 86400,
      });
      res.send(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = ApiContoller;
