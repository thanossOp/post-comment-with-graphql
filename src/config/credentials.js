require('dotenv').config()

const credentials = {
    db: process.env.DATABASE,
    port: process.env.PORT,
    secretkey: process.env.SECRETKEY
}

module.exports = credentials