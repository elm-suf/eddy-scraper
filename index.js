const express = require("express");
const instaTouch = require("instatouch");

const app = express();
app.use(express.static('client'));

const port = process.env.PORT || 6969;

const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];


app.get("/data/:placeId/:count", async (req, res) => {
  const placeId = req.params.placeId;
  const count = req.params.count;
  const options = { count: count, mediaType: "all", filetype: "csv" };

  console.log("Pid", placeId);
  console.log("count", count);
  try {
    const location = await instaTouch.location(placeId, options);

    console.log("loc: " + location);

    res.sendFile(location.csv);
  } catch (error) {
    res.send("sorry");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/data`);
});
