console.log('home');

let url = 'https://11.fesp.shop';

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

  brunches.sort((a, b) => b.views - a.views); // 조회수대로 정렬

  const HOT_BRUNCH = 10;
  const container = document.getElementById('brunch-container');

  const colors = [
    'wheat',
    'crimson',
    'orangered',
    'firebrick',
    'lightsalmon',
    'orange',
    'peru',
    'khaki',
    'yellowcreen',
    'darksalmon',
    'tomato',
    'bisque',
    'maroon',
    'sienna',
    'forestgreen',
    'darkgreen',
    'cadetblue',
    'teal',
    'aqua',
    'steelblue',
    'lightsteelblue',
    'darkslateblue',
    'mediumpurple',
    'plum',
  ];

  brunches.forEach((brunch, idx) => {
    if (idx >= HOT_BRUNCH) return;

    console.log(brunch, idx);

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    let brunchNode = document.createElement('div');
    brunchNode.innerHTML = `
        <div class="pl-1 pt-6 c-border-b flex items-start gap-3.5">
          <img src="/src/assets/numbers/${idx + 1}.svg" />
          <div class="flex flex-col pb-5">
            <h3 class="c-text-17 leading-6">${brunch.title}</h3>
            <span class="c-text-writer text-sm font-light leading-5"
              ><italic class="font-georgia c-text-by italic">by</italic>
              ${brunch.user.name}</span
            >
            <p class="c-text-content text-sm font-light leading-5 pt-5">
              ${brunch.content}
            </p>
          </div>
          <div
          class="bg-yellow-100  w-24 h-32 flex justify-center items-center px-4" 
          style="background-color: ${randomColor}"
        >
          <div class="bg-white w-16 h-20 box-border relative">
            <h3 class="c-text-9 font-light text-gray-800 px-1.5 pt-1.5 leading-3">
                ${brunch.title}
            </h3>
            <span
            class="c-text-7 font-light text-gray-600 leading-3 absolute bottom-2 left-2"
            >${brunch.user.name}</span
          >
          </div>
        </div>
    `;
    container.appendChild(brunchNode);
  });
});
