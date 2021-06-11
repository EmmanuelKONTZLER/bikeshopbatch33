var express = require('express');
var router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HfNBZBZAiyJlzCqX9of8qUVRWk7oHijqW8Ci5RJJyyJlHLVooIzMCsr3XxjhLYSbHGVp01uZEcL5D3id83xjTr300ln5uuNBc');

var dataBike = [
  {name:"BIK045", url:"/images/bike-1.jpg", price:679},
  {name:"ZOOK07", url:"/images/bike-2.jpg", price:999},
  {name:"TITANS", url:"/images/bike-3.jpg", price:799},
  {name:"CEWO", url:"/images/bike-4.jpg", price:1300},
  {name:"AMIG039", url:"/images/bike-5.jpg", price:479},
  {name:"LIK099", url:"/images/bike-6.jpg", price:869},
]

// var dataCardBike = [
//   {name:"BIK045", url:"/images/bike-1.jpg", price:679, quantity:1},
//   {name:"ZOOK07", url:"/images/bike-2.jpg", price:999, quantity:2},
// ]

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.dataCardBike){
    req.session.dataCardBike = []
  }
  res.render('index', {dataBike:dataBike});
});

router.get('/shop', function(req, res, next) {
  console.log("11",req.session.dataCardBike.findIndex(el => el.name == req.query.name))
  if(req.session.dataCardBike.findIndex(el => el.name == req.query.name) == -1){
    req.session.dataCardBike.push({name: req.query.name, url: req.query.url, price: req.query.price, quantity: 1})
  } else {
    req.session.dataCardBike[req.session.dataCardBike.findIndex(el => el.name == req.query.name)].quantity ++
  }
  res.render('shop', {dataCardBike:req.session.dataCardBike});
});

router.get('/delete-shop', function(req, res, next) {
  console.log('01', req.query)
  req.session.dataCardBike.splice(req.query.position, 1)
  
  res.render('shop', {dataCardBike:req.session.dataCardBike});
});

router.post('/updateqte', function(req, res, next) {
  console.log("02", req.body.position)
  console.log("03", req.session.dataCardBike)
  req.session.dataCardBike[req.body.position].quantity = req.body.quantity
  res.render('shop', {dataCardBike:req.session.dataCardBike});
});

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Vélo BIK098',
          },
          unit_amount: 2000,
        },
        quantity: 2,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });
 
  res.json({ id: session.id });
 });

module.exports = router;
