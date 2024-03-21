const express = require("express");
const mongoose = require("mongoose");
const bookRoute = require("./routes/bookRoute.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", async (request, response) => {
  return response.status(200).json({ message: "welcome to bookstore api" });
});

// book router
app.use("/books", bookRoute);

const URL = "mongodb://localhost:27017";
const dbname = "bookstore";
mongoose
  .connect(`${URL}/${dbname}`)
  .then(() => {
    console.log("app is connected to database");
    app.listen(5555, () => {
      console.log("app is listening");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
