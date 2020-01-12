var express = require('express');
var router = express.Router();

var dataBike = [
  {name:"BIK045", url:"/images/bike-1.jpg", price:679},
  {name:"ZOOK07", url:"/images/bike-2.jpg", price:999},
  {name:"TITANS", url:"/images/bike-3.jpg", price:799},
  {name:"CEWO", url:"/images/bike-4.jpg", price:1300},
  {name:"AMIG039", url:"/images/bike-5.jpg", price:479},
  {name:"LIK099", url:"/images/bike-6.jpg", price:869},
]

var dataCardBike = [
  {name:"BIK045", url:"/images/bike-1.jpg", price:679, quantity:1},
  {name:"ZOOK07", url:"/images/bike-2.jpg", price:999, quantity:2},
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {dataBike:dataBike});
});

router.get('/shop', function(req, res, next) {
  res.render('shop', {dataCardBike:dataCardBike});
});

module.exports = router;
