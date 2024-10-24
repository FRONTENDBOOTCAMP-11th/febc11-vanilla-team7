'use strict';
let subscript = document.getElementById('subscriptionImg');
let url = 'https://11.fesp.shop/';

function subscription() {
  if (subscript.src.includes('subscription.svg')) {
    subscript.src = '../assets/icons/subscription_on.svg';
  } else {
    subscript.src = '../assets/icons/subscription.svg';
  }
}

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

getInfo();
