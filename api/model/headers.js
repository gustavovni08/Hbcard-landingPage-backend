require('dotenv').config();

const headers = {
    accept: 'application/json',
    access_token: process.env.apiKey,
    'content-type': 'application/json'
}

module.exports = headers