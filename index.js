// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Load MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;
console.log("mongoURI", mongoURI);

if (!mongoURI) {
  console.error("Error: MONGO_URI environment variable is not defined.");
  process.exit(1); // Exit the process if MONGO_URI is not set
}

// Connect to MongoDB
mongoose
  .connect(mongoURI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// === Schemas and Models ===
const menuItemSchema = new mongoose.Schema({
  arName: String,
  enName: String,
  price: Number,
  category: String,
});
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

const merchItemSchema = new mongoose.Schema({
  arName: String,
  enName: String,
  price: Number,
});
const MerchItem = mongoose.model("MerchItem", merchItemSchema);

const locationItemSchema = new mongoose.Schema({
  arName: String,
  enName: String,
  location: String,
});
const LocationItem = mongoose.model("LocationItem", locationItemSchema);

// === Routes ===
const router = express.Router();

// --- Menu Routes ---
router.post("/menu", async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error creating menu item:", err);
    res.status(500).json({ message: "Error creating menu item" });
  }
});

router.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.send(items);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

router.put("/menu/:id", async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating menu item:", err);
    res.status(500).json({ message: "Error updating menu item" });
  }
});

router.delete("/menu/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Menu item not found" });
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu item:", err);
    res.status(500).json({ message: "Error deleting menu item" });
  }
});

// --- Merch Routes ---
router.post("/merch", async (req, res) => {
  try {
    const newItem = new MerchItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error creating merch item:", err);
    res.status(500).json({ message: "Error creating merch item" });
  }
});

router.get("/merch", async (req, res) => {
  try {
    const items = await MerchItem.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching merch items:", err);
    res.status(500).json({ message: "Error fetching merch items" });
  }
});

router.put("/merch/:id", async (req, res) => {
  try {
    const updatedItem = await MerchItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Merch item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating merch item:", err);
    res.status(500).json({ message: "Error updating merch item" });
  }
});

router.delete("/merch/:id", async (req, res) => {
  try {
    const deletedItem = await MerchItem.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Merch item not found" });
    res.status(200).json({ message: "Merch item deleted successfully" });
  } catch (err) {
    console.error("Error deleting merch item:", err);
    res.status(500).json({ message: "Error deleting merch item" });
  }
});

// --- Location Routes ---
router.post("/locations", async (req, res) => {
  try {
    const newItem = new LocationItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error creating location item:", err);
    res.status(500).json({ message: "Error creating location item" });
  }
});

router.get("/locations", async (req, res) => {
  try {
    const items = await LocationItem.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching location items:", err);
    res.status(500).json({ message: "Error fetching location items" });
  }
});

router.put("/locations/:id", async (req, res) => {
  try {
    const updatedItem = await LocationItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem)
      return res.status(404).json({ message: "Location item not found" });
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error("Error updating location item:", err);
    res.status(500).json({ message: "Error updating location item" });
  }
});

router.delete("/locations/:id", async (req, res) => {
  try {
    const deletedItem = await LocationItem.findByIdAndDelete(req.params.id);
    if (!deletedItem)
      return res.status(404).json({ message: "Location item not found" });
    res.status(200).json({ message: "Location item deleted successfully" });
  } catch (err) {
    console.error("Error deleting location item:", err);
    res.status(500).json({ message: "Error deleting location item" });
  }
});

// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
