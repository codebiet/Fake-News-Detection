//https://www.npmjs.com/package/google-news-scraper

let express = require("express");
var port=process.env.PORT || 8000;
const NewsAPI = require("newsapi");
const fetch = require("node-fetch");
extractor = require("unfluff");
const googleNewsScraper = require("google-news-scraper");

const newsapi = new NewsAPI("4dbc17e007ab436fb66416009dfb59a8");
let app = express();
// const predict = require('./predict');

app.use(function (req, res, next) {
	console.log(`${new Date()} - ${req.method} request for ${req.url}`);
	next();
});

app.use(express.static("static"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

app.listen(port,() => {
    console.log(`Running on server at http://localhost:${port}/`);
});

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

app.get("/relatedNews1", (req, res) => {
	console.log(req.query);
	if (req.query.headline);
	else {
		res.send("Invalid request");
		return;
	}

	(async () => {
		newsapi.v2
			.everything({
				q: req.query.headline,
				pageSize: 20,
				language: "en",
			})
			.then((response) => {
				//res.send(response);
				r = {};
				r["totalResults"] = 0;
				r["articles"] = [];
				let tot = 0,
					i = 0;
				for (; i < response["articles"].length; i++) {
					nws = {};
					nws["title"] = response["articles"][i]["title"];
					nws["description"] = response["articles"][i]["description"];
					nws["url"] = response["articles"][i]["url"];
					nws["content"] = response["articles"][i]["content"];
					nws["urlToImage"] = response["articles"][i]["urlToImage"];
					r["articles"].push(nws);
					tot += 1;
				}
				r["totalResults"] = tot;
				console.log(r);
				res.send(r);
			});
	})();
});

app.get("/relatedNews", (req, res) => {
	console.log(req.query);
	if (req.query.headline);
	else {
		res.send("Invalid request");
		return;
	}

	(async () => {
		console.log("entered");
		const articles = await googleNewsScraper({
			searchTerm: req.query.headline,
			prettyURLs: false,
			timeframe: "5d",
			puppeteerArgs: ['--no-sandbox',
			'--disable-setuid-sandbox'],
		});
		console.log("welcome");
		console.log(articles);

		r = {};
		r["totalResults"] = 0;
		r["articles"] = [];
		let tot = 0,
			i = 0;
		for (; i < articles.length; i++) {
			nws = {};
			nws["title"] = articles[i]["title"];
			nws["description"] = articles[i]["subtitle"];
			nws["url"] = articles[i]["link"];
			nws["content"] = articles[i]["subtitle"];
			nws["urlToImage"] = articles[i]["image"];
			r["articles"].push(nws);
			tot += 1;
		}
		r["totalResults"] = tot;
		console.log(r);
		res.send(r);
	})();

	//	res.send("relatedGoogleNewsScrapper");
});

app.get("/parseUrl", (req, res) => {
	//	   u='https://timesofindia.indiatimes.com/city/lucknow';

	if (req.query.u);
	else {
		res.send("Invalid request1 ");
		return;
	}
	//console.log(req.query.u);
	u = req.query.u;
	console.log(u);

	(async () => {
		await fetch(u) // https://cors-anywhere.herokuapp.com/https://example.com
			.then((response) => (data = response.text()))
			.catch(() =>
				console.log(
					"Can’t access " + u + " response. Blocked by browser?"
				)
			);
		await data.then(function (r) {
			my_html_data = r;
			//console.log(r);
		});

		console.log("html data parsed");

		data = await extractor(my_html_data, "en");

		console.log(data);
		res.send(data);
	})();
});
