import { subscription } from './subscript';

let idNo;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLTsp4AiLCJlbWFpbCI6ImFkbWluQGZlc3Auc2hvcCIsImltYWdlIjoiL2FwaS9kYmluaXQtc2FtcGxlL2JydW5jaC91cGxvYWRGaWxlcy91c2VyLW11emkud2VicFxuIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzAwOTkxMzAsImV4cCI6MTczMDE4NTUzMCwiaXNzIjoiRkVTUCJ9.yFsdgpFNx4oxQL3y4tRll6Cn9pi772WqaXKenUuJDl0';
let url = 'https://11.fesp.shop';

async function bookmark(url) {
  const res = await fetch(`${url}/post`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-id': 'vanilla07',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

async function getId() {
  const data = await bookmark(`${url}/bookmarks`);
  console.log(data);
  const id = data.item[0]._id;
  console.log(id);
  return id;
}

getId().then(id => {
  console.log(id);
  idNo = id;
});

export function post() {
  'use strict';

  const postId = window.pageId;

  console.log('postID!!!' + postId);
  // let url = 'https://11.fesp.shop';

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
    detailData(`${url}posts/${postId}`).then(data => {
      console.log(data);
    });
  }

  renderDetail();

  let subBtn = document.getElementById('subBtn');
  let likeBtn = document.getElementById('likeBtn');

  function like() {
    let likeNo = document.getElementById('likeNo');
    let likeImg = document.getElementById('likeImg');
    if (likeImg.src.includes('like_off.svg')) {
      likeImg.src = 'src/assets/icons/like.svg';
      likeNo.innerHTML++;

      async function bookmarkUser(url) {
        const res = await fetch(`${url}/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-id': 'vanilla07',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            target_id: 3,
            memo: '좋아요',
            extra: {
              type: 'post',
              like: likeNo.innerHTML,
            },
          }),
        });
        return res.json();
      }
      bookmarkUser(`${url}/bookmarks`).then(data => {
        console.log(data);
      });
    } else {
      likeImg.src = 'src/assets/icons/like_off.svg';
      likeNo.innerHTML--;

      async function bookmarkDelete(url) {
        const res = await fetch(`${url}/${idNo++}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'client-id': 'vanilla07',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.json();
      }
      bookmarkDelete(`${url}/bookmarks`).then(data => {
        console.log(data);
      });
    }
  }

  subBtn.addEventListener('click', subscription);

  likeBtn.addEventListener('click', like);
}
