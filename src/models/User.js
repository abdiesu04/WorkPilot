const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  }
});


// encrypt password before saving

userSchema.pre('save',async function(next){
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

// compare password

userSchema.methods.matchPassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const user  = mongoose.model('User', userSchema);
module.exports = user;