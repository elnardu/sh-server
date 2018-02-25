var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Data', new Schema({
    author: Schema.Types.ObjectId,
    nodes: [Schema.Types.Mixed ],
    links: [Schema.Types.Mixed ],
    group: Schema.Types.ObjectId,
    outputs: [Schema.Types.Mixed ],
    arduinoid: String
}, { timestamps: true }));