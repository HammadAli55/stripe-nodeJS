function handleStripeEvent(event) {
    if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object;
  
      // Get the customer ID and subscription ID from the invoice
      const customerId = invoice.customer;
      const subscriptionId = invoice.subscription;
  
      // Retrieve the customer and subscription objects from Stripe
      stripe.customers.retrieve(customerId, async (err, customer) => {
        if (err) {
          console.log('Error retrieving customer:', err);
          return;
        }
  
        const subscription = customer.subscriptions.data.find(sub => sub.id === subscriptionId);
  
        if (subscription) {
          // Handle the payment failure for the subscription
          console.log(`Payment failed for subscription ${subscription.id}`);
          // Implement your custom logic for handling the failure, such as notifying the customer or taking corrective action.
        } else {
          console.log('Subscription not found');
        }
      });
    }
  }