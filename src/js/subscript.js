let idNo;
let url = 'https://11.fesp.shop/';

const token = sessionStorage.getItem('accessToken');

// const userId = window.writerId || 2;

// getUser(`${url}users?_id=${userId}`).then(data => {
//   console.log(data);
//   console.log(data.item[0]._id);
// });

// function getToken() {
//   return writerData().then(data => {
//     const writers = data.item;
//     token = writers[1].accessToken;
//   });
// }

// getToken().then(() => {
//   async function bookmark(url) {
//     const res = await fetch(`${url}/user`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'client-id': 'vanilla07',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.json();
//   }
// });

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
    console.log(id);
    return id;
  }

  getId().then(id => {
    console.log(id);
    idNo = id;
  });

  // 작가 홈에서 작가 구독
  if (document.location.href === 'http://localhost:5173/writerHome') {
    console.log('true');
    // 구독 안 됐을 때 구독 되게
    if (subscript.src.includes('subscription.svg')) {
      subscript.src = 'src/assets/icons/subscription_on.svg';
      const userId = window.writerId || 2;
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
            target_id: `${userId}`,
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
      subscript.src = 'src/assets/icons/subscription.svg';

      // 북마크 삭제
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
      bookmarkDelete(`${url}bookmarks`).then(data => {
        console.log(data);
      });
    }
  }

  // post에서 작가 구독
  else if (document.location.href === 'http://localhost:5173/post') {
    const postId = window.pageId;

    if (subscript.src.includes('subscription.svg')) {
      subscript.src = 'src/assets/icons/subscription_on.svg';

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
            target_id: `${postId}`,
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
      subscript.src = 'src/assets/icons/subscription.svg';

      // 북마크 삭제
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
      bookmarkDelete(`${url}bookmarks`).then(data => {
        console.log(data);
      });
    }

    // if (subscript.src.includes('subscription.svg')) {
    //   subscript.src = 'src/assets/icons/subscription_on.svg';

    //   const userId = window.writerId || 2;
    //   // 구독 시 북마크 등록
    //   async function bookmarkUser(url) {
    //     const res = await fetch(`${url}/user`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'client-id': 'vanilla07',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({
    //         target_id: `${userId}`,
    //         memo: '구독',
    //         extra: {
    //           type: 'user',
    //         },
    //       }),
    //     });
    //     return res.json();
    //   }
    //   bookmarkUser(`${url}bookmarks`).then(data => {
    //     console.log(data);
    //   });

    //   // 구독 취소 시
    // } else {
    //   subscript.src = 'src/assets/icons/subscription.svg';

    //   // 북마크 삭제
    //   async function bookmarkDelete(url) {
    //     const res = await fetch(`${url}/${idNo++}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'client-id': 'vanilla07',
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     return res.json();
    //   }
    //   bookmarkDelete(`${url}bookmarks`).then(data => {
    //     console.log(data);
    //   });
    // }
  }
}

// // 구독 안 됐을 때 구독 되게
// if (subscript.src.includes('subscription.svg')) {
//   subscript.src = 'src/assets/icons/subscription_on.svg';

//   // 구독 시 북마크 등록
//   async function bookmarkUser(url) {
//     const res = await fetch(`${url}/user`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'client-id': 'vanilla07',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         target_id: 2,
//         memo: '구독',
//         extra: {
//           type: 'user',
//         },
//       }),
//     });
//     return res.json();
//   }
//   bookmarkUser(`${base_url}bookmarks`).then(data => {
//     console.log(data);
//   });

//   // 구독 취소 시
// } else {
//   subscript.src = 'src/assets/icons/subscription.svg';

//   // 북마크 삭제
//   async function bookmarkDelete(url) {
//     const res = await fetch(`${url}/${idNo++}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'client-id': 'vanilla07',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.json();
//   }
//   bookmarkDelete(`${base_url}bookmarks`).then(data => {
//     console.log(data);
//   });
// }
