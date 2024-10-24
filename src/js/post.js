'use strict';
import { subscription } from './subscript';

let subBtn = document.getElementById('subBtn');
let likeBtn = document.getElementById('likeBtn');

function like() {
  let likeNo = document.getElementById('likeNo');
  let likeImg = document.getElementById('likeImg');
  if (likeImg.src.includes('like.svg')) {
    likeImg.src = '../assets/icons/like_off.svg';
    likeNo.innerHTML--;
  } else {
    likeImg.src = '../assets/icons/like.svg';
    likeNo.innerHTML++;
  }
}

subBtn.addEventListener('click', subscription);

likeBtn.addEventListener('click', like);
