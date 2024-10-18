function logoutHeader() {
  const changeElement = document.getElementById('change');

  // changeElement가 존재하는지 확인 후 내용 수정
  if (changeElement) {
    changeElement.innerHTML = `
      <img
          class="ml-auto active:scale-95"
          src="/src/assets/icons/header-search.svg"
        />
        <button
          class="bg-black c-rounded-15 py-1 px-3 text-white c-text-10 active:scale-95"
        >
          시작하기
        </button>
      `;
  }
}

// header 불러오기
function loadHeader(page) {
  // 홈 페이지에서는 custom header 설정
  if (page === 'home') {
    fetch('/src/components/header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
        // 홈 화면의 헤더를 수정
        logoutHeader();
      })
      .catch(err => console.log('Header Error: ' + err));
  }
  // 검색 페이지와 글쓰기 페이지에서는 헤더를 로드하지 않음
  else if (page !== 'search' && page !== 'write') {
    fetch('/src/components/header.html')
      .then(res => res.text())
      .then(data => (document.getElementById('header').innerHTML = data))
      .catch(err => console.log('Header Error: ' + err));
  } else {
    document.getElementById('header').innerHTML = ''; // 헤더를 비움
  }
}

function loadFooter(page) {
  fetch('/src/components/footer.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
      const images = document.querySelectorAll('img');

      images.forEach(image => {
        if (image.src.includes(page)) {
          image.src = `/src/assets/icons/${page}-on.svg`;
        }
      });
    })
    .catch(err => console.log('Footer Error: ' + err));
}

// 페이지 라우팅 로직
function loadPage(page) {
  fetch(`src/views/${page}.html`)
    .then(res => res.text())
    .then(data => (document.getElementById('main').innerHTML = data))
    .catch(err => console.log('Page Load Error', err));

  // 페이지에 맞게 헤더/푸터를 로드
  loadHeader(page);
  loadFooter(page);
}

// 네비게이션에서 클릭 시 페이지를 로드
function navigate(page) {
  history.pushState(null, '', `/${page}.html`);
  loadPage(page);
}

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
