var express = require('express');
var router = express.Router();

const keycloak = require('../config/keycloak-config.js').getKeycloak();

router.get('/anonymous', function(req, res){
    res.json({message: 'anonymous'});
    // res.send("Hello Anonymous");
});
router.get('/user', keycloak.protect('realm:user'), function(req, res){
    res.json({message: 'user'});
    // res.send("Hello User");
});

router.get('/admin', keycloak.protect('realm:admin'), function(req, res){
    res.json({message: 'admin'});
    // res.send("Hello Admin");
});

// router.get('/all-user', keycloak.protect(['user', 'admin']), function(req, res){
//     // res.send("Hello All User");
//     res.json({message: 'All users'});
// });

module.exports = router;
