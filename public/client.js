const stripe = Stripe(
  "pk_test_51Mc9oUIhyqHYmyD1FYZBI4sZ9EsdjnutnfnuwuEfZJRfPbGt5c1YWrQn0PG3L2c2b12eCyLUAH25kcWrUO3F6LkX00BOQ01fVD",
  {
    apiVersion: "2022-11-15",
  }
);

let clientSecret;

async function createPaymentIntent() {
  const res = await fetch(
    "https://studioharterink.com/.netlify/functions/create-payment-intent"
  );
  const data = await res.json();
  clientSecret = data.clientSecret;
  // return data;
}

createPaymentIntent();

const paymentRequest = stripe.paymentRequest({
  country: "BE",
  currency: "eur",
  total: {
    label: "Vase",
    amount: 3000,
  },
  requestPayerName: true,
  requestPayerEmail: true,
  requestShipping: true,
});

const elements = stripe.elements();
const prButton = elements.create("paymentRequestButton", {
  paymentRequest,
});

(async () => {
  // Check the availability of the Payment Request API first.
  const result = await paymentRequest.canMakePayment();
  if (result) {
    prButton.mount("#payment-request-button");
  } else {
    document.getElementById("payment-request-button").style.display = "none";
  }
})();

paymentRequest.on("paymentmethod", async (ev) => {
  // Confirm the PaymentIntent without handling potential next actions (yet).
  const { paymentIntent, error: confirmError } =
    await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: ev.paymentMethod.id },
      { handleActions: false }
    );

  if (confirmError) {
    // Report to the browser that the payment failed, prompting it to
    // re-show the payment interface, or show an error message and close
    // the payment interface.
    ev.complete("fail");
  } else {
    // Report to the browser that the confirmation was successful, prompting
    // it to close the browser payment method collection interface.
    ev.complete("success");
    // Check if the PaymentIntent requires any actions and if so let Stripe.js
    // handle the flow. If using an API version older than "2019-02-11"
    // instead check for: `paymentIntent.status === "requires_source_action"`.
    if (paymentIntent.status === "requires_action") {
      // Let Stripe.js handle the rest of the payment flow.
      const { error } = await stripe.confirmCardPayment(clientSecret);
      if (error) {
        // The payment failed -- ask your customer for a new payment method.
        document.getElementById("payment-error").style.display = "block";
      } else {
        document.getElementById("payment-request-button").style.display =
          "none";
        document.getElementById("payment-succeeded").style.display = "block";
        // The payment has succeeded.
      }
    } else {
      // The payment has succeeded.
      document.getElementById("payment-request-button").style.display = "none";
      document.getElementById("payment-succeeded").style.display = "block";
    }
  }
});
