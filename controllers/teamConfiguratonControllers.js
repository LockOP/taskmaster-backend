// src/controllers/teamConfigurationController.js
const TeamConfiguration = require('../models/TeamConfiguration'); // Import the TeamConfiguration model

// Create a new TeamConfiguration
const createTeamConfiguration = async (req, res) => {
    try {
        const { status } = req.body;

        const teamConfiguration = new TeamConfiguration({
            status,
        });

        await teamConfiguration.save();
        res.status(201).json({ message: "Team configuration created successfully", teamConfiguration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all TeamConfigurations
const getAllTeamConfigurations = async (req, res) => {
    try {
        const teamConfigurations = await TeamConfiguration.find();
        res.status(200).json(teamConfigurations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific TeamConfiguration by ID
const getTeamConfigurationById = async (req, res) => {
    try {
        const { configId } = req.params;
        const teamConfiguration = await TeamConfiguration.findById(configId);
        if (!teamConfiguration) {
            return res.status(404).json({ error: "Team configuration not found" });
        }
        res.status(200).json(teamConfiguration);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a TeamConfiguration by ID
const updateTeamConfiguration = async (req, res) => {
    try {
        const { configId } = req.params;
        const updatedData = req.body;
        const updatedTeamConfiguration = await TeamConfiguration.findByIdAndUpdate(configId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedTeamConfiguration) {
            return res.status(404).json({ error: "Team configuration not found" });
        }

        res.status(200).json({ message: "Team configuration updated successfully", updatedTeamConfiguration });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a TeamConfiguration by ID
const deleteTeamConfiguration = async (req, res) => {
    try {
        const { configId } = req.params;
        const deletedTeamConfiguration = await TeamConfiguration.findByIdAndDelete(configId);
        if (!deletedTeamConfiguration) {
            return res.status(404).json({ error: "Team configuration not found" });
        }

        res.status(200).json({ message: "Team configuration deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createTeamConfiguration,
    getAllTeamConfigurations,
    getTeamConfigurationById,
    updateTeamConfiguration,
    deleteTeamConfiguration,
};
