import { subscription } from './subscript';
export function post() {
  'use strict';

  const postId = window.pageId;

  console.log('postID!!!' + postId);
  let url = 'https://11.fesp.shop';

  async function detailData(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'client-id': 'vanilla07',
      },
    });

    return response.json();
  }

  function renderDetail() {
    detailData(`${url}/posts/${postId}`).then(data => {
      console.log(data);
    });
  }

  renderDetail();

  let subBtn = document.getElementById('subBtn');
  let likeBtn = document.getElementById('likeBtn');

  function like() {
    let likeNo = document.getElementById('likeNo');
    let likeImg = document.getElementById('likeImg');
    if (likeImg.src.includes('like.svg')) {
      likeImg.src = 'src/assets/icons/like_off.svg';
      likeNo.innerHTML--;
    } else {
      likeImg.src = 'src/assets/icons/like.svg';
      likeNo.innerHTML++;
    }
  }

  subBtn.addEventListener('click', subscription);

  likeBtn.addEventListener('click', like);
}
