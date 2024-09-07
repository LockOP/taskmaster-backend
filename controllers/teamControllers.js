// src/controllers/teamController.js
const Team = require("../dataModels/teamModel"); // Import the Team model
const StatusOption = require("../dataModels/taskConfigurationOptionModels/statusOption");
const TypeOption = require("../dataModels/taskConfigurationOptionModels/typeOption");

const createTeam = async (req, res) => {
  try {
    const { title, description, status, type } = req.body;

    const statusIds = [];
    for (let i = 0; i < status.length; i++) {
      const validStatus = await StatusOption.findById(status[i]).lean();
      if (validStatus) {
        statusIds.push(validStatus._id);
      }
    }

    const typeIds = [];
    for (let i = 0; i < type.length; i++) {
      const validType = await TypeOption.findById(type[i]).lean();
      if (validType) {
        typeIds.push(validType._id);
      }
    }

    console.log(statusIds, typeIds);

    const team = new Team({
      title,
      description,
      products: [],
      taskOptions: {
        status: statusIds,
        type: typeIds,
      },
    });

    await team.save();

    res.status(201).json({ message: "success", team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTeam,
};
