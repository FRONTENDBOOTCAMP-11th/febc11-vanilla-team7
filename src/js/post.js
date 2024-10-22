'use strict';

let subscript = document.getElementById('subscriptionImg');
let likeNo = document.getElementById('likeNo');
let likeImg = document.getElementById('likeImg');

function subscription() {
  if (subscript.src.includes('subscription.svg')) {
    subscript.src = '../assets/icons/subscription_on.svg';
  } else {
    subscript.src = '../assets/icons/subscription.svg';
  }
}

function like() {
  if (likeImg.src.includes('like.svg')) {
    likeImg.src = '../assets/icons/like_off.svg';
    likeNo.innerHTML--;
  } else {
    likeImg.src = '../assets/icons/like.svg';
    likeNo.innerHTML++;
  }
}
