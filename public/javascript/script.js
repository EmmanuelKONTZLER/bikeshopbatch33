var stripe = Stripe('pk_test_51HfNBZBZAiyJlzCqaGLpIyqd3t9vIxwsTV8mfDWR3CP7KEIIqj4l6gpZUmusZWkHvtPUxcUsYl2cN7kzpHdyJUYT00fx2p3oji');
var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function() {
  console.log('coucou')
  fetch('/create-checkout-session', {
    method: 'POST',
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(session) {
    return stripe.redirectToCheckout({ sessionId: session.id });
  })
  .then(function(result) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, you should display the localized error message to your
    // customer using `error.message`.
    if (result.error) {
      alert(result.error.message);
    }
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
});