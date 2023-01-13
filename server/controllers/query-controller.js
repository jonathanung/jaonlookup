const Query = require('../models/query-model');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');

class QueryController {
    // Create a new query
    createQuery = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let user = await User.findOne({ _id: userID }), { ...data } = req.body;
    
        data.user = user;
    
        try {
            const newQuery = await new Query(data).save()
            const updatedUser = await User.findOneAndUpdate({ _id: userID }, { $push: { queries: newQuery } })
            res.json(newQuery);
        } catch (err) {
            res.json(err);
        }
    };

    //Gets all queries that the user has done
    getUserQueries = async (req, res) => { 
        if (!req.cookies.usertoken) {
            return res.status(400);
        }
        const userData = jwt.decode(req.cookies.usertoken, { complete: true }), userID = userData.payload.id;
        let user = await User.findOne({ _id: userID })
        Query.find({ user: user }).sort({ createdAt: -1 })
            .then(query => res.json(query))
            .catch(err => res.json(err))
    }

    // Delete an query
    deleteQuery = async (req, res) => {
        if (!req.cookies.usertoken) {
            return res.status(400);
        }

        Query.findByIdAndDelete(req.params.id)
            .then(query => res.json(query))
            .catch(err => res.json(err));
    };
}

module.exports = new QueryController();

