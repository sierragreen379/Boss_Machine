const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting
} = require('./db');

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.status(200).send(allMeetings);
});

// POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    if (newMeeting) {
        addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    } else {
        res.status(404).send();
    }
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    const deleteAllMeetings = deleteAllFromDatabase('meetings');
    if (deleteAllMeetings) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});