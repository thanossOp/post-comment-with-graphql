const mongoose = require('mongoose')
const {db} = require('../config/credentials')


mongoose.connect(db).then(()=>{
    console.log('Database connected')
})