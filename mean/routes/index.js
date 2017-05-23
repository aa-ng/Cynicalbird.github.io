var express = require('express');
var router = express.Router();
var Page = require('../models/page');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Home',
        message: 'Website under construction'
    });
});

router.post('/api', function(req, res, next){
    Page.getPageByUrl('/', function(err, doc){
        if (err)
        {
            console.log("'/' not found");
        }
        else
        {
            res.json(doc);
        }
    });
});

module.exports = router;
