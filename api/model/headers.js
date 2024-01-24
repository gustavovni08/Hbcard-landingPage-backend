require('dotenv').config();

const apiUrl = process.env.url

const headers = {
    accept: 'application/json',
    access_token: process.env.api_key,
    'content-type': 'application/json'
}

module.exports = {
    headers,
    apiUrl
}