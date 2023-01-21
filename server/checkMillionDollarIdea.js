const checkMillionDollarIdea = (req, res, next) => {
    const ideaTotalValue = Number(req.body.numWeeks * req.body.weeklyRevenue);
    if (ideaTotalValue >= 1000000) {
        next();
    } else {
        res.status(400).send("This isn't worth a million dollars!");
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
