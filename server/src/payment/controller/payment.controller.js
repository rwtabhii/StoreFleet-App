import Stripe from "stripe";
import env from "../../../dotenv.js";


// initialize the stripe with the secret key
const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res, next) => {
    try {
        console.log("payment run")
        const { amount } = req.body;
        const args = {
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        }
        // create payment intent``
        const paymentIntent = await stripe.paymentIntents.create(args)
        // get clinet secret from the intent 
        console.log(paymentIntent.client_secret);
        // send back to the client 
        return res.status(200).json({success : true,clientSecret: paymentIntent.client_secret })

    } catch (err) {
        next()
    }
}