const express = require('express');
const app = express();
const server = require('http').createServer(app);
const multer = require('multer');
const path = require('path');
const Baby = require('babyparse');
const bodyParser = require('body-parser');
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const router = express.Router()
const mongoose = require('mongoose');
const config = require('../config/database')
mongoose.connect(config.database);
const db = mongoose.connection;
var entete = []
var variable
var filename;
let User = require('../Model/user')
//function parse
function parcih(req, res) {
    var file = fs.readFileSync(req.file.path) + ""
    filename = req.file.originalname;

    Baby.parse(file, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            donne = results.data
            var json = JSON.stringify(donne);
        }
    });
}

router.post('/', ensureAuthentification, upload.single('myfile'), function(req, res) {
    parcih(req, res);
    var key = []; //nombre de champs
    var keys = Object.keys(donne[1]);
    entete = []
    for (var x = 0; x < keys.length; x++) {
        entete.push(keys[x]); //remplir un tableau avec les champs a tester
        key.push(x); //remplir un tableau avec les index des champs a tester
    }
    variable = donne
    res.send({donne,entete})
});

router.post('/add', ensureAuthentification, function(req, res) {
    var newentete = []
    var numberentete = Object.keys(req.body).length;
    for (var i = 0; i < numberentete; i++) {
        newentete.push(req.param("f" + i))
    }
    for (var j = 0; j < variable.length; j++) {
        for (var i = 0; i < entete.length; i++) {
            if (entete[i] !== newentete[i] && newentete[i] !== "") {
                variable[j][newentete[i]] = variable[j][entete[i]]
                delete variable[j][entete[i]];
            }
            if (newentete[i] === "") {
                delete variable[j][entete[i]];
            }
        }
    }
    var newUser = 'user_id'
    var newValue = req.user._id
    /*for (var j = 0; j < variable.length; j++) {
        variable[j][newUser] = newValue;
    }*/
    var col = db.collection('satoripop' + newValue + filename)
    col.insert(variable, function(err, mongooseDocuments) {
        if (err) {
            console.log(err)
        } else {
            variable = new Object();
            entete = [];
            console.log('sayee')
            res.redirect('/')
        }
    })

});
router.get('/show/:id', ensureAuthentification, function(req, res) {
    var userId = req.user._id
    console.log(userId)
    collectionsname = []
    User.findById(userId, function(err, user) {
        if (err) {
            throw err
        } else {
            mongoose.connection.db.listCollections().toArray(function(err, names) {
                if (err) {
                    console.log(err);
                } else {
                    for (var i = 0; i < names.length; i++) {
                        if (names[i]['name'].indexOf(userId) !== -1) {
                            var collection = names[i]['name'];
                            var prefix = 'satoripop' + userId;
                            collectionsname.push(collection.slice(prefix.length, collection.length))
                        }
                    }
                }
            });
                var showedentete = []
                var uniqueNames = [];
            db.collection('satoripop' + userId + req.params.id).find().toArray(function(err, csvm) {
               
                var keyss = Object.keys(csvm[1])
                for (var i = 0; i < keyss.length; i++) {
                    showedentete.push(keyss[i])
                        //console.log(showedentete[i])

                }
                var count= Object.keys(csvm).length
                for (var i = 0; i < count; i++) {
                    
                    for (var j = 0; j < Object.keys(csvm[i]).length; j++) {
                        uniqueNames.push(Object.keys(csvm[i])[j])

                        //console.log(csvm[i][keyss[j]])
                        //console.log(Object.keys(csvm[i])[j])
                       // console.log(showedentete[j])
                   
                    }

                }
                uniqueNames = uniqueNames.filter( function( item, index, inputArray ) {
           return inputArray.indexOf(item) == index;
                        });

                console.log(uniqueNames)
                res.render('showcsv', {
                    name: user.name,
                    csvm: csvm,
                    collectionsname: collectionsname,
                    uniqueNames: uniqueNames
                })
            })
        }
    })
});
function ensureAuthentification(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('please login')
        res.redirect('/users/login')
    }
}
module.exports = router;