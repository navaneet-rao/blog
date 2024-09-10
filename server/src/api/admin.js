const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const { userId } = req; // Assuming userId is added to the request object after authentication
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { admin: true },
  });
  if (user?.admin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied" });
  }
};

// Admin routes
router.get("/admin/users", isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// More admin routes as needed...

module.exports = router;
