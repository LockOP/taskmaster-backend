const express = require("express");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routers/userRouters");
const authenticateUser = require("./middleware/authUser");
const { inventoryRouter } = require("./routers/inventoryRouters");
const { inventoryModelSpecificRouter } = require("./routers/inventoryModelSpecificrouters");
const connectDB = require("./configs/databaseConnect");

app.use(express.json());
app.use(cors());

connectDB();


///////////// -----
app.get("/", (req, res) => {
  res.send("inventory-backend");
  console.log("service triggered");
});
// // check middleware // requires header = "Bearer "+token // token response from login
// app.get("/check", authenticateUser, (req, res) => {
//   res
//     .status(201)
//     .json({ message: "inventory-backend-middleware", userId: req.userId });
//   console.log("middleware service triggered");
// });
//////////// -----


app.use("/api/users". userRputer);
app.use("/api/tasks", taskRouter);
app.use("/api/products", productRouter);
app.use("/api/teamconfiguration", teamConfigurationRouter);
app.use("/api/team", teamRouter);


const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
