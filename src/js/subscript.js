export function subscription(subscript) {
  subscript = document.getElementById('subscriptionImg');
  if (subscript.src.includes('subscription.svg')) {
    subscript.src = 'src/assets/icons/subscription_on.svg';
  } else {
    subscript.src = 'src/assets/icons/subscription.svg';
  }
}
