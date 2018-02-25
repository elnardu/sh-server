var express = require("express"),
    Data = require("../models/Data"),
    ObjectId = require('mongoose').Types.ObjectId

var router = express.Router();

router.post('/getData', (req, res) => {
    const userId = req.decoded.id;

    let id = req.body.id;

    if (!id) {
        res.json({ success: false, error: "NANI?" })
        return
    }

    Data.findById(id).then(data => {
        res.json({ success: true, data: data })
    })
})

router.post('/createData', (req, res) => {
    const userId = req.decoded.id;

    let group = req.body.group;
    let arduinoid = req.body.arduinoid;

    if (!group || !arduinoid) {
        res.json({ success: false, error: "NANI?" })
        return
    }

    let data = new Data({ author: ObjectId(userId), group: ObjectId(group), arduinoid: arduinoid })
    data.save().then(() => {
        res.json({ success: true, id: data._id })
    })
})

router.post('/updateData', (req, res) => {
    const userId = req.decoded.id;
    let data = req.body.data;

    Data.findByIdAndUpdate(data._id, data).then(() => {
        res.json({ success: true })
    })
})

module.exports = router;