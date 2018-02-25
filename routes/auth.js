var express = require("express"),
    User = require("../models/user"),
    jwt = require('jsonwebtoken');


var router = express.Router();

router.route('/register').post(function (req, res) {
    var username = req.body.username,
        password = req.body.password,
        name = req.body.name;

    if (!username || !password || !name) {
        res.json({ error: "Not enough data", success: false });
        return;
    }

    var user = new User({
        username: username,
        password: password,
        name: name
    });

    user.save(function (err) {
        if (err) {
            if (err.code === 11000) {
                res.json({ error: "Username duplication", success: false });
                return;
            }
            throw err;
        }

        console.log("User " + username + " sign up!");
        var token = jwt.sign({
            username: user.username,
            id: user._id
        }, req.app.get('secret'), {
                expiresIn: 86400 // expires in 24 hours
            });
        res.json({ success: true, token: token });
    });
});

router.route('/login').post(function (req, res) { //SIGN IN
    var username = req.body.username,
        password = req.body.password;

    if (!username || !password) {
        res.json({ error: "Not enough data", success: false });
        return;
    }

    User.findOne({
        username: username
    }, function (err, user) {
        if (err)
            throw err;
        if (!user) {
            res.json({ success: false, error: "WTF?" });
        } else {
            user.comparePassword(password, function (err, isMatch) {
                if (err)
                    throw err;
                if (isMatch) {
                    var token = jwt.sign({
                        username: user.username,
                        id: user._id
                    }, req.app.get('secret'), {
                            expiresIn: 86400 // expires in 24 hours
                        });
                    res.json({ success: true, token: token});
                    console.log("User " + user.username + " sign in!");
                } else {
                    res.json({ success: false, error: "Invalid password!" });
                }
            });
        }
    });
});

module.exports = router;
