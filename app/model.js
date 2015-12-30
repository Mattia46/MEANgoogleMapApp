var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    gender: {type: String, required: true},
    favlang: {type: String },
    location: {type: [Number], required: true}, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
                                 });

UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now;
    }
    next();
});

UserSchema.index({location: '2dsphere'});

module.exports = mongoose.model('mattia-user', UserSchema);
