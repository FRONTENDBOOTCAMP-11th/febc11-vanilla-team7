'use strict';

let subscript = document.getElementById('subscriptionImg');
let likeNo = document.getElementById('likeNo');

function subscription() {
  if (subscript.src.includes('subscription.svg')) {
    subscript.src = '../assets/icons/subscription_on.svg';
  } else {
    subscript.src = '../assets/icons/subscription.svg';
  }
}

function like() {}
