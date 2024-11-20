const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;
const getAll = async (req, res) => {
    const database = await mongodb.getdatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).JSON(users);
    });
};

const getsingle = async (req, res) => {
    const userId  = new objectId(req.params.id);
    const database = await mongodb.getdatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).JSON(users[0]);
    });
};

module.exports = {
    getAll,
    getsingle
};