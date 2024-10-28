// src/js/index.js (모듈을 하나로 통합하여 내보낼 수도 있습니다)
const pages = import.meta.glob('/src/js/*.js');

function loginHeader() {
  const changeElement = document.getElementById('change');

  changeElement.innerHTML = `
      <img
          class="ml-auto active:scale-95"
          src="/src/assets/icons/header-search.svg"
        />
       <button
          style="background-color: black"
          class="c-rounded-15 py-1 px-3 text-white c-text-10 active:scale-95 bg-black"
          onclick="navigate('login')"
          >
          시작하기
        </button>
      `;
}

// header 불러오기
function loadHeader(page) {
  if (page === 'home') {
    fetch('/src/components/header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
        // 홈 화면의 헤더를 수정
        loginHeader();
      })
      .catch(err => console.log('Header Error: ' + err));
  }
  // 헤더를 로드하지 않는 페이지
  else if (
    page === 'search' ||
    page === 'write' ||
    page === 'upload' ||
    page === 'login' ||
    page === 'signup'
  ) {
    document.getElementById('header').innerHTML = ''; // 헤더 없앰
  } else {
    // 헤더 필요한 페이지 --> 헤더 가져옴
    fetch('/src/components/header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      })
      .catch(err => console.log('Header Error: ' + err));
  }
}

async function loadFooter(page) {
  if (page === 'login' || page === 'signup') {
    document.getElementById('footer').innerHTML = '';
  } else {
    try {
      // footer.html 로드
      const res = await fetch('/src/components/footer.html');
      const data = await res.text();
      document.getElementById('footer').innerHTML = data;

      if (
        page === 'home' ||
        page === 'search' ||
        page === 'write' ||
        page === 'mybox'
      ) {
        // 아이콘 변경 로직
        const images = document.querySelectorAll('img');
        images.forEach(image => {
          if (image.src.includes(page)) {
            image.src = `/src/assets/icons/${page}-on.svg`;
          }
        });
      }
    } catch (err) {
      console.log('Footer Error: ' + err);
    }
  }
}

// 페이지 라우팅 로직
async function loadPage(page) {
  try {
    const res = await fetch(`src/views/${page}.html`);
    const data = await res.text();

    document.getElementById('main').innerHTML = data;

    // 모듈을 동적으로 임포트
    const modulePath = `/src/js/${page}.js`; // 경로 설정

    if (pages[modulePath]) {
      const module = await pages[modulePath]();
      const moduleFunction = module[page];

      if (typeof module[page] === 'function') {
        moduleFunction();
      }
    }
  } catch (err) {
    console.log('페이지 로드 오류', err);
  }

  loadHeader(page);
  loadFooter(page);
}

// 네비게이션에서 클릭 시 페이지를 로드
function navigate(page) {
  history.pushState(null, '', `/${page}`);

  loadPage(page);
}

window.navigate = navigate;

// 현재 웹 페이지 경로에서 페이지 이름만 가져오기
window.addEventListener('popstate', () => {
  // 브라우저의 네비게이션 버튼을 클릭할 때 ( 뒤로가기 & 앞으로가기 )
  const page = window.location.pathname.split('/').pop().replace('.html', '');
  loadPage(page || 'home'); // 기본 페이지는 home
});

// 초기 로드 시
const initialPage =
  window.location.pathname.split('/').pop().replace('.html', '') || 'home';

loadPage(initialPage);
