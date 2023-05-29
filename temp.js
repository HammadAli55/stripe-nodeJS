const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const stripe = require("stripe")(
  ""
);
const cors = require("cors");

app.use(cors());

app.post("/checkout", async (req, res) => {
  try {
    token = req.body.token;
    userData =  req.body.userData;
    console.log("token id:", userData);
    const customers = await stripe.customers.list({ email: token.owner.email });
    if (customers.data.length > 0) {
      // Customer exists
      console.log("customer exists");
      return false;
    } else {
      //create customer
      const customer = stripe.customers
        .create({
          email: token.owner.email,
          source: token.id,
          address: token.owner.address,
          metadata: { customer_kuid: userData.customer_kuid }
        })
        .then((customer) => {
          return stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: "price_1MoKFEBUJKiCM3GCEIvHF09Y" }],
            billing_cycle_anchor: 1685102231,
          });
        })
        .then((charge) => {
          res.json({
            data: "success",
          });
        })
        .catch((err) => {
          console.error("err:", err);
          res.json({
            data: "failure",
          });
        });
      return true;
    }
  } catch (error) {
    // Handle any errors
    console.error("Error checking customer:", error);
    return false;
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000")
})