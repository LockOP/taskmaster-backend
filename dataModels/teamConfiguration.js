const mongoose = require('mongoose');

const TeamConfonfiguration = new mongoose.Schema({
    status: {
        type: [String], // Array of strings
        required: true,
        default: ['In Progress', 'Under Review', 'Completed'], // Optional: Set default value(s)
    },
});

module.exports = mongoose.model('TeamConfonfiguration', TeamConfonfiguration);
