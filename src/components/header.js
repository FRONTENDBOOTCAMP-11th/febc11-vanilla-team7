document.addEventListener('DOMContentLoaded', () => {
  const currentUrl = location.href;

  console.log('Current URL:', currentUrl); // 콘솔에서 URL 확인

  // 현재 URL이 'home'을 포함하는지 확인
  if (currentUrl.includes('home')) {
    const changeElement = document.getElementById('change');

    // changeElement가 존재하는지 확인 후 내용 수정
    if (changeElement) {
      changeElement.innerHTML = `
          <img class="mr-auto" src="/src/assets/logos/default.svg" />
          <button>
            <img
              class="ml-auto active:scale-95"
              src="/src/assets/icons/header-search.svg"
            />
          </button>
          <button
            class="bg-black c-rounded-15 py-1 px-3 text-white c-text-10 active:scale-95"
          >
            시작하기
          </button>
        `;
      console.log('Header changed successfully.');
    } else {
      console.error("Element with id 'change' not found.");
    }
  } else {
    console.log('Not the home page.');
  }
});
