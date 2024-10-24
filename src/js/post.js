'use strict';

let subscript = document.getElementById('subscriptionImg');
let likeNo = document.getElementById('likeNo');
let likeImg = document.getElementById('likeImg');
let subBtn = document.getElementById('subBtn');
let likeBtn = document.getElementById('liekBtn');

export function subscription() {
  if (subscript.src.includes('subscription.svg')) {
    subscript.src = '../assets/icons/subscription_on.svg';
  } else {
    subscript.src = '../assets/icons/subscription.svg';
  }
}

subBtn.addEventListener('click', subscription);

function like() {
  if (likeImg.src.includes('like.svg')) {
    likeImg.src = '../assets/icons/like_off.svg';
    likeNo.innerHTML--;
  } else {
    likeImg.src = '../assets/icons/like.svg';
    likeNo.innerHTML++;
  }
}

likeBtn.addEventListener('click', like);
