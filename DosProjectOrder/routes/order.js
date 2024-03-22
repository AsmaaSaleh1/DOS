const express = require('express');
const axios = require('axios');
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./database/orders.db')
const router = express.Router();
router.post("/purchases", async (req, res) => {
  try {
    const { bookID, quantity } = req.body;
    const response = await axios.get(`http://catalog:3000/catalog/searchByID/${bookID}`)

    if (response.data && response.data.stock) {
      const currentStock = response.data.stock;
      const newStock = currentStock - quantity;

      const updateResponse = await axios.patch(`http://catalog:3000/catalog/update/stock/${bookID}`, {
        "stock": newStock
      });

      if (updateResponse.data && updateResponse.data.message === "Stock updated successfully") {
        const totalCost = quantity* response.data.price;
        const orderQuery = 'INSERT INTO orders(bookID, totalCost, quantity) VALUES (?,?,?);';
        const orderValues = [bookID, totalCost, quantity];

        const orderInsertion = await db.run(orderQuery, orderValues);

        if (orderInsertion.rows.length > 0) {
          res.status(200).json({ message: "Order placed successfully" });
        } else {
          res.status(500).json({ error: "Failed to place order" });
        }
      } else {
        res.status(500).json({ error: "Failed to update stock" });
      }
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
