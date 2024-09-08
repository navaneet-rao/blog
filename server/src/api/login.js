// src/api/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, password: true }, // Select necessary fields
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a token (JWT example)
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email }, // Include user details
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
