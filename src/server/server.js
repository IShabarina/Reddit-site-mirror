import express from "express";
import ReactDOM from "react-dom/server";
import { App } from "../App";
import { indexTemplate } from "./indexTemplate";
import axios from "axios";

const app = express();

app.use("/static", express.static("./dist/client"));

app.get('/auth', (req, res) => {
   // send POST request acording to https://github.com/reddit-archive/reddit/wiki/OAuth2:
  axios.post(
    'https://www.reddit.com/api/v1/access_token',
    `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
    {
      auth: { username: process.env.CLIENT_ID, password: 'cHU4d9dtwBns-xGcttqSpDdM9H1knQ' },
      headers: { 'Content-type': 'application/x-www-form-urlencoded' }
    }
  )
  // receive token in 'data' key and move it to client:
    .then(({ data }) => {
      res.send(
        indexTemplate(ReactDOM.renderToString(App()), data['access_token']),
      );
      console.log(data['access_token']); 
    })
    .catch(console.log)
});


app.get("*", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App())));
});

app.listen(3000, () => {
  console.log("server started on port http://localhost:3000");
});
