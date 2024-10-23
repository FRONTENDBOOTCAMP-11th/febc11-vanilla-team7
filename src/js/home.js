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
  const HOT_BRUNCH = 5;
  const container = document.getElementById('brunch-container');

  brunches.forEach((brunch, idx) => {
    if (idx >= HOT_BRUNCH) return;
    console.log(brunch, idx);

    let brunchNode = document.createElement('div');
    brunchNode.innerHTML = `
        <div class="pl-1 pt-6 c-border-b flex items-start gap-3.5">
          <img src="/src/assets/numbers/${idx + 1}.svg" />
          <div class="pb-5">
            <h3 class="c-text-17 leading-6">${brunch.title}</h3>
            <span class="c-text-writer text-sm font-light leading-5"
              ><italic class="font-georgia c-text-by italic">by</italic>
              ${brunch.user.name}</span
            >
            <p class="c-text-content text-sm font-light leading-5 pt-5">
              ${brunch.content}
            </p>
          </div>
          <img src="/src/assets/img/book.png" />
        </div>
    `;
    container.appendChild(brunchNode);
  });
});
