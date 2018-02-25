var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Group', new Schema({
    author: Schema.Types.ObjectId,
    outputs: [Schema.Types.Mixed],
    inputs: [Schema.Types.Mixed],
    lines: [Schema.Types.Mixed],
    arduinos: [{
        dataId: Schema.Types.ObjectId,
        x: Number,
        y: Number,
        id: String,
        pins: {

        }
    }],
    name: String
}, { timestamps: true }));