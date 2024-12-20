let idNo;
let url = 'https://11.fesp.shop/';

const token = sessionStorage.getItem('accessToken');

export function subscription(subscript) {
  subscript = document.getElementById('subscriptionImg');

  // 북마크 확인
  async function bookmark(url) {
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

  async function getId() {
    const data = await bookmark(`${url}bookmarks`);
    console.log(data);
    const id = data.item[0]._id;
    return id;
  }

  // 작가 홈에서 작가 구독
  if (
    document.location.href ===
    'https://brunchstory-lucky7.netlify.app/writerHome'
  ) {
    console.log('true');
    // 구독 안 됐을 때 구독 되게
    if (subscript.src.includes('subscription.svg')) {
      subscript.src = '/public/assets/icons/subscription_on.svg';
      const userId = Number(window.writerId) || 2;
      // 구독 시 북마크 등록
      async function bookmarkUser(url) {
        const res = await fetch(`${url}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-id': 'vanilla07',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            target_id: userId,
            memo: '구독',
            extra: {
              type: 'user',
            },
          }),
        });
        return res.json();
      }
      bookmarkUser(`${url}bookmarks`).then(data => {
        console.log(data);
      });

      // 구독 취소 시
    } else {
      subscript.src = '/public/assets/icons/subscription.svg';

      // 북마크 삭제
      async function bookmarkDelete(url) {
        const id = await getId();
        idNo = id;
        console.log(idNo);
        const res = await fetch(`${url}/${idNo}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'client-id': 'vanilla07',
            Authorization: `Bearer ${token}`,
          },
        });
        return res.json();
      }
      bookmarkDelete(`${url}bookmarks`).then(data => {
        console.log(data);
      });
    }
  }

  // post에서 작가 구독
  else if (
    document.location.href === 'https://brunchstory-lucky7.netlify.app/post'
  ) {
    const postId = window.pageId;
    console.log(postId);

    // userId 받아옴
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

    async function getUserId() {
      const data = await detailData(`${url}/posts/${postId}`);
      console.log(data);
      return data.item.user._id;
    }

    getUserId().then(userId => {
      console.log(userId);
      if (subscript.src.includes('subscription.svg')) {
        subscript.src = '/public/assets/icons/subscription_on.svg';

        // 구독 시 북마크 등록
        async function bookmarkUser(url) {
          const res = await fetch(`${url}/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'client-id': 'vanilla07',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              // postId 대신 userId 사용
              target_id: userId,
              memo: '구독',
              extra: {
                type: 'user',
              },
            }),
          });
          return res.json();
        }
        bookmarkUser(`${url}bookmarks`).then(data => {
          console.log(data);
        });

        // 구독 취소 시
      } else {
        subscript.src = '/public/assets/icons/subscription.svg';

        // 북마크 삭제
        async function bookmarkDelete(url) {
          const id = await getId();
          idNo = id;
          console.log(idNo);
          const res = await fetch(`${url}/${idNo}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'client-id': 'vanilla07',
              Authorization: `Bearer ${token}`,
            },
          });
          return res.json();
        }
        bookmarkDelete(`${url}bookmarks`).then(data => {
          console.log(data);
        });
      }
    });
  }
}
