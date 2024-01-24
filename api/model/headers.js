require('dotenv').config();

const apiUrl = process.env.prod_url

const headers = {
    accept: 'application/json',
    access_token: process.env.prod_api_key,
    'content-type': 'application/json'
}

module.exports = {
    headers,
    apiUrl
}