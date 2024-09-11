const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();
// const prisma = new PrismaClient();

// Middleware
app.use(cors());

// Increase the payload size limit (set appropriate size limit, e.g., 10MB)
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// API Routes
const signupRoute = require("./src/api/sigup");
const loginRoute = require("./src/api/login");
const categoriesRoute = require("./src/api/categories");
const postRoute = require("./src/api/post");
const allpostRoute = require("./src/api/allposts");
const commentRoute = require("./src/api/comments");
const adminRoutes = require("./src/api/admin");
const userRoutes = require("./src/api/userroutes");

app.use("/api/admin", adminRoutes);
app.use(signupRoute);
app.use(loginRoute);
app.use(categoriesRoute);
app.use(postRoute);
app.use(allpostRoute);
app.use(commentRoute);
app.use(userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
