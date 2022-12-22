// Dependencies
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const port = process.env.PORT || 80;

// Configurations
app.use(bodyParser.json());
// Endpoints
app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/notify", (req, res) => {
  const url = `https://api.telegram.org/bot${process.env.TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&text=Received:+${req.body.amount}+coins`;
  const sendTelegram = async (url) => {
    try {
      const response = await axios.post(url);
      const json = await response.json();
      if (json.ok) {
        console.log("Message Send");
      } else {
        console.log("Send fail");
      }
    } catch (e) {
      console.log(e);
    }
  };
  sendTelegram(url);
  res.send("OK!");
});
// Listening
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
