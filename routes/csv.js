const express = require('express'),
app = express(),
server = require('http').createServer(app),
multer = require('multer'),
path = require('path'),
Baby = require('babyparse'),
bodyParser = require('body-parser'),
upload = multer({dest: 'uploads/'}),
fs = require('fs');
var io = require('socket.io')(server);
server.listen(4000);
const router = express.Router(),
mongoose = require('mongoose'),
config = require('../config/database'),
db = mongoose.connection;
mongoose.connect(config.database);
let User = require('../Model/user')
var entete = []
var variable
var filename;
var mysocket;

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
    filterentete(req, res, entete, variable)
    var newValue = req.user._id
    var col = db.collection('satoripop' + newValue + filename)
    var ix = 0
    var willinserted = (variable.length / 10).toString().split(".")[0];
 recursive(variable,willinserted,col,ix)


    variable = new Object();
    entete = [];
    console.log('sayee')
    res.redirect('/')
});



router.get('/show/:id', ensureAuthentification, function(req, res) {
    var userId = req.user._id
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
            var uniqueNames = [];
            db.collection('satoripop' + userId + req.params.id).find().toArray(function(err, csvm) {
                var count = Object.keys(csvm).length
                for (var i = 0; i < count; i++) {

                    for (var j = 0; j < Object.keys(csvm[i]).length; j++) {
                        uniqueNames.push(Object.keys(csvm[i])[j])
                    }

                }
                uniqueNames = uniqueNames.filter(function(item, index, inputArray) {
                    return inputArray.indexOf(item) == index;
                });
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
var recursive = function(variable,willinserted,col,ix) {
    //io.sockets.emit('news', ix)
    var b = variable.splice(0, willinserted);
     col.insert(b, function(err, mongooseDocuments) {
             if (ix < 11) {
                var msg = "this is i " + (ix * 10) + '%'
                 

        ix++
        return recursive(variable,willinserted,col,ix);
    }else{
        io.on('connection', function(socket) {
        var msgg = 'finish'
        console.log(msgg)
    socket.emit('newss',msgg)
});
      
    }

        })
}
function ensureAuthentification(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('please login')
        res.redirect('/users/login')
    }
}
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
function filterentete(req, res, entete, variable) {
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
}
module.exports = router;