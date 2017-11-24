/*
'use strict'
var nano = require('nano')('http://localhost:5984');
var couch = nano.db.use('moviedb');
const fs = require('fs')
/**
 * Array of User objects


module.exports = {
    'findUser': findUser,
    'authenticate': authenticate,
    'save': save
}

// Find user in the users database (dbUsers)
function findUser(username, cb) {
    const user = couch.view('9a302910b99db08ba1341cbfd20017bf', 'usersView', function(err, body) {
        if (!err) {
            body.rows.forEach(function(doc) {
                console.log(doc.value);
            });
        }
    });
    cb(null, user)
}

// Check if the user exists and if password is right
function authenticate(username, password, cb) {
    findUser(username, cb)
    if(!user) return cb(null, null, 'User ${username} does not exists')
    if(password != user.password) return cb(null, null, 'Invalid password')
    cb(null, user)
}

// Save the user database
function save() {
    fs.writeFile('./data/usersDb.json', JSON.stringify(dbUsers))
}*/