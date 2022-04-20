let base_url_event = "https://app.ticketmaster.com/discovery/v2/events.json";
let base_url_news = "https://music-news-api.p.rapidapi.com/news";
const axios = require("axios");

class ApiContoller {
  static async getConcert(req, res, next) {
    try {
      const response = await axios({
        method: "GET",
        url: base_url_event,
        params: {
          apikey: "rdUsQNGzW2T0HrTvtFFr3DWLnqmmWalM",
          classificationName: "music",
        },
      });
      const dataEvent = response.data._embedded.events.map((el) => {
        return {
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
          "X-RapidAPI-Key": "bceb9bc8d9msh32bf74c796f87bdp1e5348jsn7acd08d36732",
        },
      });
      res.status(200).json(data.splice(1, 17));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiContoller;
