const express = require("express");

const cors = require("cors");
const authRouter = require("./routers/authRouters");
const teamRouter = require("./routers/teamRouters");

const connectDB = require("./configs/databaseConnect");
const authenticateJWT = require("./middleware/authenticateJWT");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  res.send("taskmaster-backend");
  console.log("service triggered");
});

app.use("/api/auth", authRouter);
app.use("/api", authenticateJWT, teamRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
