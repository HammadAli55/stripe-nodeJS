const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const stripe = require("stripe")("enter secret key here");
const cors = require('cors')

app.use(cors())

app.post('/checkout', async(req, res) => {
    try {
        console.log(req.body);
        token = req.body.token
      const customer = stripe.customers
        .create({
          email: "hammadalii@outlook.com",
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
          return stripe.charges.create({
            amount: 1000,
            description: "Test Purchase using express and Node",
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
      return true;
    } catch (error) {
      return false;
    }
})

app.listen(5000, () => {
    console.log("App is listening on Port 5000")
})