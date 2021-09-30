var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
    // Register
    addNew: function (req, res) {
        if ((!req.body.username)) { // || (!req.body.password) 
            res.json({success: false, msg: 'Enter all fields'})
        }
        else {
            var newUser = User({
                username: req.body.username,
                password: req.body.password
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    if(err.code == '11000'){
                        res.json({
                            msg:'This username has already been registered, please change your username',
                            success:false
                        })
                    }
                    else{
                        res.json({success: false, msg: 'Failed to save'})
                    }
                }
                else {
                    res.json({success: true, msg: 'Successfully saved'})
                }
            })
        }
    },
    // Login
    authenticate: function (req, res) {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
                }
                else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret)
                            res.json({success: true, token: token})
                        }
                        else {
                            return res.status(403).send({success: false, msg: 'Authentication failed, wrong password'})
                        }
                    })
                }
        }
        )
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            User.find().then((developers) => {
                res.json(developers);
            });
            return res.json({success: true, msg: 'Hello ' + decodedtoken.username})
        }
        else {
            return res.json({success: false, msg: 'No Headers'})
        }
    }
}

module.exports = functions