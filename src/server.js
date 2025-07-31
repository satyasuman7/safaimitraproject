import express from "express";
import route from "./route.js";

const app = express();

// Use routes
app.use("/", route);

app.listen(5000, () => {
  console.log("Server running on 5000 PORT");
});
