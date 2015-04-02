var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/heatmap', function(req, res) {
  res.render('heatmap', { title: 'Express' });
});

module.exports = router;
