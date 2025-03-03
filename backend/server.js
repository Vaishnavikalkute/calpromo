const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { saveData, getData, updateData, deleteData } = require("./mongo_helper");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.post("/save", async (req, res) => {
  const result = await saveData(req.body);
  res.status(result.success ? 201 : 500).send(result);
});

app.get("/data", async (req, res) => {
  const result = await getData();
  res.status(result.success ? 200 : 500).send(result);
});

app.put("/update/:id", async (req, res) => {
  const result = await updateData(req.params.id, req.body);
  res.status(result.success ? 200 : 500).send(result);
});

app.delete("/delete/:id", async (req, res) => {
  const result = await deleteData(req.params.id);
  res.status(result.success ? 200 : 500).send(result);
});

app.listen(5000, () => console.log("Server running on port 5000"));
