var express = require("express"),
    Group = require("../models/Group"),
    ObjectId = require('mongoose').Types.ObjectId

var router = express.Router();

router.post('/getGroups', (req, res) => {
    const userId = req.decoded.id;

    Group.find({ author: ObjectId(userId) }).select({ "name": 1, "updatedAt": 1 }).then(groups => {
        res.json({success: true, groups: groups})
    })
})

router.post('/getGroup', (req, res) => {
    const userId = req.decoded.id;

    let id = req.body.id;

    if (!id) {
        res.json({ success: false, error: "NANI?" })
        return
    }

    Group.findById(id).then(group => {
        res.json({success: true, group: group})
    })
})

router.post('/createGroup', (req, res) => {
    const userId = req.decoded.id;

    let name = req.body.name;

    if (!name) {
        res.json({success: false, error: "NANI?"})
        return
    }

    let group = new Group({name: name, author: ObjectId(userId)})
    group.save().then(() => {
        res.json({success: true, id: group._id})
    })
})

router.post('/updateGroup', (req, res) => {
    const userId = req.decoded.id;
    let group = req.body.group;

    Group.findByIdAndUpdate(group._id, group).then(() => {
        res.json({success: true})
    })
})

module.exports = router;