import { subscription } from './subscript';

let idNo;
let base_url = 'https://11.fesp.shop/';
const token = sessionStorage.getItem('accessToken');

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
      const postData = data.item;

      // post 데이터 연동
      let title = document.getElementById('title');
      let subtitle = document.getElementById('subtitle');
      let userTitle = document.getElementById('userTitle');
      let dateTitle = document.getElementById('dateTitle');
      let user = document.getElementById('user');
      let job = document.getElementById('job');
      let userImg = document.getElementById('userImg');

      title.innerHTML = `${postData.title}`;
      if (postData.extra.subTitle !== '부제목') {
        subtitle.innerHTML = `${postData.extra.subTitle}`;
      } else {
        subtitle.innerHTML = '';
      }

      userTitle.innerHTML = `${postData.user.name}`;
      dateTitle.innerHTML = `${postData.updatedAt.split(' ')[0]}`;

      user.innerHTML = `${postData.user.name}`;
      if (Object.keys(postData.user).includes('job')) {
        job.innerHTML = `${postData.user.job}`;
      } else {
        job.innerHTML = '';
      }
      userImg.setAttribute('src', `${postData.user.image}`);
    });
  }

  renderDetail();

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
    const data = await bookmark(`${base_url}bookmarks`);
    console.log(data);
    const id = data.item[0]._id;
    console.log(id);
    return id;
  }

  getId().then(id => {
    idNo = id;
    console.log(id);
  });

  // 좋아요 북마크 추가/삭제
  let subBtn = document.getElementById('subBtn');
  let likeBtn = document.getElementById('likeBtn');

  let likeNo = document.getElementById('likeNo');
  let likeImg = document.getElementById('likeImg');

  function like() {
    // 좋아요 등록
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
            target_id: postId,
            memo: '좋아요',
            extra: {
              type: 'post',
              like: likeNo.innerHTML,
            },
          }),
        });
        return res.json();
      }
      bookmarkUser(`${base_url}/bookmarks`).then(data => {
        console.log(data);
      });

      // 좋아요 취소
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
      bookmarkDelete(`${base_url}/bookmarks`).then(data => {
        console.log(data);
      });
    }
  }

  // 북마크 확인해서 좋아요 유지
  async function likeCheck() {
    const likeData = await bookmark(`${base_url}bookmarks`);
    console.log(likeData);
    let isLike = false;
    for (let i = 0; i < likeData.item.length; i++) {
      if (likeData.item[i].post._id === postId) {
        likeImg.src = 'src/assets/icons/like.svg';
        likeNo.innerHTML = `${likeData.item[i].extra.like}`;
        break;
      }
      if (!isLike) {
        likeImg.src = 'src/assets/icons/like_off.svg';
      }
    }
  }

  // 유저 데이터 북마크 확인
  async function userBookmark(url) {
    const res = await fetch(`${url}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  }

  // 북마크 확인해서 구독 유지 - 포스트
  async function subscriptPost() {
    const data = await userBookmark(`${url}/bookmarks`);
    const subscriptData = await detailData(`${url}/posts/${postId}`);
    let script = document.getElementById('subscriptionImg');
    console.log(data);
    console.log(subscriptData);
    let isSubscript = false;
    for (let i = 0; i < data.item.length; i++) {
      if (data.item[i].user._id === subscriptData.item.user._id) {
        script.src = 'src/assets/icons/subscription_on.svg';
        break;
      }

      if (!isSubscript) {
        script.src = 'src/assets/icons/subscription.svg';
      }
    }
  }

  likeCheck();

  subscriptPost();

  subBtn.addEventListener('click', subscription);

  likeBtn.addEventListener('click', like);
}
