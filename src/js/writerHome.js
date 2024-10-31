'use strict';
import { subscription } from './subscript';

export function writerHome() {
  const userId = window.writerId || 2;

  console.log('userID!!!' + userId);

  let subBtn = document.getElementById('subBtn');
  let url = 'https://11.fesp.shop/';

  subBtn.addEventListener('click', subscription);

  async function getUser(url) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
    });

    console.log(url);
    return res.json();
  }

  getUser(`${url}users?_id=${userId}`).then(data => {
    console.log(data); //필요한 데이터 dbinit-sample/brunch/data.js에 넣어서 써야 함 --> git pull 받은 기존 data.js 파일에 필요한 데이터 추가 하고 npm run dbinit (dbinit-sample 에서!)
    // 데이터 초기화 할 시 팀원들에게 말해주기!

    const users = data.item[0];
    document.querySelector('#user').innerHTML = `
      <h1 class="text-black-head flex flex-col text-[27px]">
      ${users.name || ''}
      <span class="text-gray-light text-xs">${users.extra.job}</span>
      </h1>
      <img class="-mt-10 size-20 rounded-full" src="${users.image}" />
    `;
  });

  async function getInfo(url) {
    const res = await fetch(`${url}?type=info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
    });
    return res.json();
  }

  getInfo(`${url}posts`).then(data => {
    const brunches = data.item[1];

    for (let i = 0; i < 3; i++) {
      let liNode = document.createElement('li');
      liNode.innerHTML = `
      <div class="pt-[21px] pb-[18px] px-5">
              <a class="text-[13px] underline c-text-primary" href="#"
                >취준은 처음이라</a
              >
              <h2 class="text-[17px] text-black-head">
                ${brunches.title}
              </h2>
              <p class="text-xs text-gray-light leading-5">
                <span class="text-gray mr-[21px]"
                  >${brunches.extra.subTitle}</span
                >
                | 취업 준비를 위해 반드 시 필요한 것 세 가지. 자기소개서, 이력서,
                포트폴리오. 그중에서 최…
              </p>
              <div class="flex gap-3 text-xs text-gray-light">
                <p>댓글 <span>${brunches.repliesCount}</span></p>
                <span
                  class=" before:w-0.5 before:h-0.5 before:rounded-full before:block before:bg-[#DDDDDD] flex items-center gap-1"
                  >${brunches.createdAt}</span
                >
              </div>
            </div>
            <hr class="border-[#EEEEEE]" />
  
    `;
      document.querySelector('#writeList').appendChild(liNode);
    }
  });
}
