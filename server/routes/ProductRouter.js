import express from "express";
const router = express.Router();

// Example: Get all products
router.get("/", (req, res) => {
  res.json({ message: "Get all products" });
});

// Example: Get product by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Get product with ID: ${id}` });
});

// Example: Create a product
router.post("/", (req, res) => {
  const { name, price } = req.body;
  res.json({ message: "Product created", product: { name, price } });
});

// Example: Update a product
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  res.json({ message: `Product ${id} updated`, product: { name, price } });
});

// Example: Delete a product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Product ${id} deleted` });
});

export default router;  // ✅ ESM export
