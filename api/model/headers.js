require('dotenv').config();

const apiUrl = process.env.apiUrl

const headers = {
    accept: 'application/json',
    access_token: process.env.apiKey,
    'content-type': 'application/json'
}

module.exports = {
    headers,
    apiUrl
}