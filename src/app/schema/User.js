const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        celphone: {
            type: String,
            required: false
        },
        links_portfolio: [{
            type: String,
            required: false
        }],
        type_user: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('users', User);