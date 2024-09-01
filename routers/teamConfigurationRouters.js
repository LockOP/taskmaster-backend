// src/routers/teamConfigurationRoutes.js
const express = require("express");
const {
    createTeamConfiguration,
    getAllTeamConfigurations,
    getTeamConfigurationById,
    updateTeamConfiguration,
    deleteTeamConfiguration,
} = require("../controllers/teamConfigurationController");

const router = express.Router();

router.post("/teamConfigurations", createTeamConfiguration);
router.get("/teamConfigurations", getAllTeamConfigurations);
router.get("/teamConfigurations/:configId", getTeamConfigurationById);
router.patch("/teamConfigurations/:configId", updateTeamConfiguration);
router.delete("/teamConfigurations/:configId", deleteTeamConfiguration);

module.exports = router;
