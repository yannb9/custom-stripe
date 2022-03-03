const express = require('express');
const cors = require('cors')
const stripe = require('stripe')('pk_live_51K6VzPAWGQ3EzDjz7Dig0DziV3mvXdCzZ6HgWv8kD7jEvv2boDWb0fbLvoKmOP5kNZB673fyEf4xKndc07GA8AHL00ksRoylzq');
const app = express();
app.use(cors({
  origin: ['https://rebibolegal.ca','https://checkout.stripe.com']
}))
app.use(express.json())

let port = process.env.PORT || 8080;

app.post('/create-checkout-session', async (req, res) => {
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
                    images:['https://rebibolegal.ca/wp-content/uploads/2022/03/payment-logo.png']
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