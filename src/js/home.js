console.log('home');

const url = 'https://11.fesp.shop';

async function brunchData(url) {
  const response = await fetch(`${url}?type=brunch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // 요청 타입 명시 (필요시)
      'client-id': 'vanilla07',
    },
  });

  return response.json();
}

brunchData(`${url}/posts`).then(data => {
  const brunches = data.item;
});
