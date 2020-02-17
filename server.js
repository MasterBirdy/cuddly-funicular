require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

// dev logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// profile routes
app.use("/api/v1/profile", require("./routes/profile"));

// handle production
if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static(__dirname + "/public/"));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`App listening on port ${port}!"`);
});
