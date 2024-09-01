const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Product model
    },
  ],
  watcher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Product model
    },
  ],

  accessTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  ],

  configOptions:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamConfiguration",

  }
});

module.exports = mongoose.model("TeamSchema", TeamSchema);
