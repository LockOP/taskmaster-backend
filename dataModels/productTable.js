const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  productID: { type: String },
});

export default mongoose.model("ProductSchema", productSchema)