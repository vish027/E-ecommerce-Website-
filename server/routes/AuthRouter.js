import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login route working");
});

export default router;   // ✅ ESM default export
