const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const stripe = require("stripe")("");
const cors = require('cors')

app.use(cors())

app.post('/checkout', async(req, res) => {
    try {
        token = req.body.token
        console.log('token id:', token)
      const customer = stripe.customers
        .create({
          email: token.owner.email,
          source: token.id,
          address: token.owner.address
        })
        .then((customer) => {
          // console.log(customer);
          return stripe.charges.create({
            amount: token.amount,
            description: "Test Purchase using express and Node",
            currency: token.currency,
            customer: customer.id,
          });
        })
        .then((charge) => {
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