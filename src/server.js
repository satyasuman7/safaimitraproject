import express from "express";
import route from "./route.js";

const app = express();

// Use routes
app.use("/", route);

// IMPORTING FOLDER
app.use(express.static("public"))

app.listen(5000, () => {
  console.log("Server running on 5000 PORT");
});
