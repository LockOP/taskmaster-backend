require("dotenv").config();

const { Team } = require("../dataModels/teamTable");
const { User } = require("../dataModels/userTable");
const { Product } = require("../dataModels/productTable");

//get all teams
const createTeam = async (req, res) => {
  try {
    const { productID, assignedBy, assignedTo, watcher, accessTo } = req.body;
    const team = await Team.create({
      productID,
      assignedBy,
      assignedTo,
      watcher,
      accessTo,
    });
    res.status(201).json(team);

    await team.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get ALL team
const getAllTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = Team.findById(teamId).populate(
      "productID assignedBy assignedTo watcher accessTo"
    );

    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get team by id

const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId).populate(
      "productID assignedBy assignedTo watcher accessTo"
    );
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//update team by id

const updateTeam = async (req, res) => {
    try {
      const { teamId } = req.params;
      const updatedData = req.body;
      const updatedTeam = await Team.findByIdAndUpdate(teamId, updatedData, {
        new: true,
        runValidators: true,
      })
        .populate("productID")
        .populate("assignedBy")
        .populate("assignedTo")
        .populate("watcher")
        .populate("accessTo")
        .populate("configOptions");
  
      if (!updatedTeam) {
        return res.status(404).json({ error: "Team not found" });
      }
  
      res.status(200).json({ message: "Team updated successfully", updatedTeam });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //delete a team by ID

  const deleteTeam = async (req, res) => {
    try {
      const { teamId } = req.params;    
      const deletedTeam = await Team.findByIdAndDelete(teamId);

      if (!deletedTeam) {
        return res.status(404).json({ error: "Team not found" });
      }
      res.status(204).json({ message: "Team deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }    
  };

  module.exports = {
    createTeam,
    getAllTeam,
    getTeamById,
    updateTeam,
    deleteTeam
  };
