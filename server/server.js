const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

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

app.use(signupRoute);
app.use(loginRoute);
app.use(categoriesRoute);
app.use(postRoute);
app.use(allpostRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
