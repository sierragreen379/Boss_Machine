const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const retreivedIdea = getFromDatabaseById('ideas', ideaId);
    if (retreivedIdea) {
        res.status(200).send(retreivedIdea);
    } else {
        res.status(404).send();
    }
});

// POST /api/ideas to create a new idea and save it to the database.
ideasRouter.post('/', (req, res, next) => {
    const idea = req.body;
    const newIdea = addToDatabase('ideas', idea);
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        res.status(400).send();
    }
});

// PUT /api/ideas/:ideaId to update a single idea by id.
ideasRouter.put('/:ideaId', (req, res, next) => {
    req.body.id = req.params.ideaId;
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    if (updatedIdea) {
        res.status(200).send(updatedIdea);
    } else {
        res.status(404).send();
    }
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteTheIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deleteTheIdea) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
});