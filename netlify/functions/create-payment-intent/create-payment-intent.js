const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(STRIPE_SECRET_KEY);

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  try {
    // const subject = event.queryStringParameters.name || 'World'

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3000,
      currency: "eur",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
