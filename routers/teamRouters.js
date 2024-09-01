// src/routers/teamRoutes.js
const express = require("express");
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

const router = express.Router();

router.post("/teams", createTeam);
router.get("/teams", getAllTeams);
router.get("/teams/:teamId", getTeamById);
router.patch("/teams/:teamId", updateTeam);
router.delete("/teams/:teamId", deleteTeam);

module.exports = router;
