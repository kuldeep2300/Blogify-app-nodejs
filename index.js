require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Model
const Blog = require("./models/blog");

// Router
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
// app.use(express.static(path.resolve("./public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(() => console.log("MongoDB Connection Failed!"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () =>
  console.log(`Server started at port: http://localhost:${PORT}`)
);
