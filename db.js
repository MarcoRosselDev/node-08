const mongoose = require('mongoose');

const connect = (url) =>{
  try {
    mongoose.connect(url)
    console.log('Connected success')
  } catch (error) {
    console.log('error en db.js', error);
  }
}

module.exports = connect