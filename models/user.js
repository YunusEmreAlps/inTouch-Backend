var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);

/*
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    default: "Null",
  },
  email: { 
    type: String, 
    default: "Null" 
	},
  username: { 
    type: String, 
    default: "Null" 
  },
  password: { 
    type: String, 
    default: "Null" 
	},
  gender: { 
    type: String,
    default: "Null" 
  },
  age: { 
    type: String, 
    default: "Null" 
  },
  description: { 
    type: String, 
    default: "Null" 
  }, //about
  imageURL: {
    type: String,
    default:
      "https://raw.githubusercontent.com/YunusEmreAlps/Flutter_find-mentor-mobil/master/find_mentor/assets/images/user2.png",
  },
*/