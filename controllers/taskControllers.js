// src/controllers/taskController.js
const Task = require('../models/Task'); // Import the Task model

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, assignedTo } = req.body;

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            assignedTo,
        });

        await task.save();
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update a task by ID
const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updatedData = req.body;
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
