require('dotenv').config();

module.exports = {
    secret: 'yoursecret',
    database: process.env.ATLAS_URI
}