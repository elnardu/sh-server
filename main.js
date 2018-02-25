require('dotenv').config()

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    morgan = require('morgan'),
    path = require('path'),
    http = require('http').Server(app);

var authRouter = require('./routes/auth'),
    dataRouter = require('./routes/data'),
    groupRouter = require('./routes/group'),
    userRouter = require('./routes/user');


mongoose.Promise = global.Promise; //tell mongoose to use default promises
mongoose.connect(process.env.MONGODB);

app.set('secret', process.env.SECRET);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/api", function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, error: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send({ success: false, error: 'No token provided.' });
    }
});

app.use('/auth', authRouter);
app.use('/api/data', dataRouter);
app.use('/api/group', groupRouter);
app.use('/api/user', userRouter);

http.listen(process.env.PORT, function () {
    console.log("Listening on port " + process.env.PORT);
});
