const express = require('express');
const cors = require('cors')
const stripe = require('stripe')('sk_test_51K6VzPAWGQ3EzDjzI9SRRA8K6JQ81pKbi9eLJ6JxOcueTmyFh1nozS3fIK436eDgwUfFO2hyNI7suEa7vPcJe6jt00IGJHQTo6');
const app = express();
app.use(cors({
  origin: ['https://rebibolegal.ca','https://checkout.stripe.com']
}))
app.use(express.json())

let port = process.env.PORT || 8080;

app.post('/create-checkout-session', async (req, res) => {
  // console.log('starting')
  console.log(req.body)
    try {
        const url = req.body.url;
        const amount = req.body.amount * 100;
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: 'Custom Payment',
                    images:['https://rebibolegal.ca/wp-content/uploads/2022/03/payment.png']
                  },
                  unit_amount: req.body.amount * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${url}?success`,
            cancel_url: `${url}?failure`,
          });
        // res.redirect('https://facebook.com');
        res.status(200).json({message: 'Success 😸', data: {msg: "hi", url: session.url}})

    } catch (error) {res.status(500).json({message: error.message})}
})

app.listen(port, () => console.log(`Listening to port ${port}`));