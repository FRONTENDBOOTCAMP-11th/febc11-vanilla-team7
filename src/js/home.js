// home.js
import { brunchData, writerData } from '/src/js/api.js';

export function home() {
  function renderBrunch() {
    brunchData().then(data => {
      const brunches = data.item;
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

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        let brunchNode = document.createElement('div');
        brunchNode.innerHTML = `
          <div class="pl-1 pt-6 c-border-b flex items-start gap-3.5">
            <img src="/public/assets/numbers/${idx + 1}.svg" />
            <div class="flex flex-col pb-5">
              <h3 class="c-text-17 leading-6">${brunch.title}</h3>
              <span class="c-text-writer text-sm font-light leading-5">
                <italic class="font-georgia c-text-by italic">by</italic>
                ${brunch.user.name}
              </span>
              <p class="c-text-content text-sm font-light leading-5 pt-5">
                ${brunch.content}
              </p>
            </div>
            <div class="bg-yellow-100 w-24 h-32 flex justify-center items-center px-4" style="background-color: ${randomColor}">
              <div class="bg-white w-16 h-20 box-border relative z-10">
                <h3 class="c-text-9 font-light text-gray-800 px-1.5 pt-1.5 leading-3">
                    ${brunch.title}
                </h3>
                <span class="c-text-7 font-light text-gray-600 leading-3 absolute bottom-2 left-2">
                  ${brunch.user.name}
                </span>
              </div>
            </div>
          </div>
        `;
        container.appendChild(brunchNode);
        brunchNode.addEventListener('click', () => goPostPage(brunch._id));
      });
    });
  }

  function goPostPage(postId) {
    // 최근 본 포스트 ID를 로컬스토리지에 저장
    const recentPosts = JSON.parse(localStorage.getItem('recentPosts') || '[]');

    // 이미 있는 포스트면 제거 후 맨 앞에 추가
    const index = recentPosts.indexOf(postId);
    if (index > -1) {
      recentPosts.splice(index, 1);
    }

    // 최근 본 포스트 맨 앞에 추가
    recentPosts.unshift(postId);

    // 최대 10개만 유지
    if (recentPosts.length > 10) {
      recentPosts.pop();
    }

    localStorage.setItem('recentPosts', JSON.stringify(recentPosts));

    // 포스트 페이지로 이동
    window.navigate('post', postId);
  }

  function goWriterPage(userId) {
    window.navigate('writerHome', null, userId);
  }

  function renderWriter() {
    writerData().then(data => {
      const writers = data.item;
      const container = document.getElementById('writer-container');

      writers.forEach(writer => {
        const writerImage = writer.image || '/public/assets/person/person.svg';
        const extra = writer.extra || {};

        const writerNode = document.createElement('div');
        writerNode.innerHTML = `
          <div class="p-5 flex flex-col items-center border border-gray-50 z-10 box-border h-full">
            <img class="rounded-full w-20 h-20" src="${writerImage}" />
            <h2 class="c-text-19 leading-5 pt-4">${writer.name || ''}</h2>
            <span class="text-xs font-light leading-4 c-text-writer pb-4 pt-1 text-center overflow-hidden whitespace-nowrap text-ellipsis">
              ${extra.job || ''}
            </span>
            <p class="text-xs font-light leading-5 c-text-content text-center">
              ${extra.biography || ''}
            </p>
          </div>
        `;

        container.appendChild(writerNode);
        writerNode.addEventListener('click', () => goWriterPage(writer._id));
      });
      console.log(writers);
    });
  }

  renderBrunch();
  renderWriter();
}
