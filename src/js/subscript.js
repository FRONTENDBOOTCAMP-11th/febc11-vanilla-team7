let idNo;
let url = 'https://11.fesp.shop/';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLTsp4AiLCJlbWFpbCI6ImFkbWluQGZlc3Auc2hvcCIsImltYWdlIjoiL2FwaS9kYmluaXQtc2FtcGxlL2JydW5jaC91cGxvYWRGaWxlcy91c2VyLW11emkud2VicFxuIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzAwOTkxMzAsImV4cCI6MTczMDE4NTUzMCwiaXNzIjoiRkVTUCJ9.yFsdgpFNx4oxQL3y4tRll6Cn9pi772WqaXKenUuJDl0';

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

export function subscription(subscript) {
  subscript = document.getElementById('subscriptionImg');

  // 구독 안 됐을 때 구독 되게
  if (subscript.src.includes('subscription.svg')) {
    subscript.src = '../assets/icons/subscription_on.svg';

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
          target_id: 2,
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
    subscript.src = '../assets/icons/subscription.svg';

    // 북마크 삭제
    async function bookmarkDelete(url) {
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
