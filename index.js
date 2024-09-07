const express = require("express");

const cors = require("cors");
const authRouter = require("./routers/authRouters");
const userRouter = require("./routers/userRouters");
// const taskRouter = require("./routers/taskRouters");
// const productRouter = require("./routers/productRouters");
// const teamConfigurationRouter = require("./routers/teamConfigurationRouters");
// const teamRouter = require("./routers/teamRouters");

// const authenticateUser = require("./middleware/authUser");

const connectDB = require("./configs/databaseConnect");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

///////////// -----
app.get("/", (req, res) => {
  res.send("taskmaster-backend");
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


app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
// app.use("/api/tasks", taskRouter);
// app.use("/api/products", productRouter);
// app.use("/api/teamconfiguration", teamConfigurationRouter);
// app.use("/api/team", teamRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
