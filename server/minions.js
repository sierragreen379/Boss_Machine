const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;

const { 
    getAllFromDatabase, 
    getFromDatabaseById,
    addToDatabase, 
    updateInstanceInDatabase, 
    deleteFromDatabasebyId
 } = require('./db');

 minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
       req.minion = minion;
       next();
    } else {
        res.status(404).send();
    }
 });

// GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.minion);
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post('/', (req, res, next) => {
    const minion = req.body;
    const newMinion = addToDatabase('minions', minion);
    res.status(201).send(newMinion);
});

// PUT /api/minions/:minionId to update a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(200).send(updatedMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteTheMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleteTheMinion) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});