const stripe = require('stripe')('sk_test_51MllwGBUJKiCM3GCX0umGaryJz29LzLGJd0GJgOI1bNmSm1XnqDpfI5yGGi9TXu8D63a1i7uU2mNGzEsXSwqVKUr00Bdyepwqp');

async function findCustomersByMetadata(metadataKey, metadataValue) {
  try {
    const customers = await stripe.customers.list();
    const filteredCustomers = customers.data.filter(customer => {
      if (customer.metadata[metadataKey] === metadataValue) {
        return true;
      }
      return false;
    });
    console.log('Customers found:', filteredCustomers);
  } catch (error) {
    console.error('Error finding customers:', error);
  }
}

// Example usage
const metadataKey = 'customer_kuid';
const metadataValue = 'wJhARh1QcOHRh7LvSsf8aQHtda1n63bp';
findCustomersByMetadata(metadataKey, metadataValue);