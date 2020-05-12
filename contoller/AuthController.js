var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/test', function (req, res) {
    res.send({ "status": "SUCCESS"});
});


module.exports = router;
