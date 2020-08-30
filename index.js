const express = require("express");
const instaTouch = require("instatouch");

const app = express();
app.use(express.static("client"));

const port = process.env.PORT || 6969;

app.get("/data/:placeId/:count", async (req, res) => {
  const placeId = req.params.placeId;
  const count = req.params.count;
  const options = { count: count, mediaType: "all", filetype: "csv" };

  console.log("Pid", placeId);
  console.log("count", count);

  try {
    const location = await instaTouch.location(placeId, options);
    const opt = {
      headers: {
        "x-count": location.count,
      },
    };
    // console.log("loc: " + JSON.stringify(location));
    res.sendFile(location.csv, opt);
  } catch (error) {
    res.send("sorry");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
