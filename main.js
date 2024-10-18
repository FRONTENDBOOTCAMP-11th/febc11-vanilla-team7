// Header와 Footer를 불러오기
fetch('/src/components/header.html')
  .then(res => res.text())
  .then(data => (document.getElementById('header').innerHTML = data))
  .catch(err => console.log('Header Error: ' + err));

fetch('/src/components/footer.html')
  .then(res => res.text())
  .then(data => (document.querySelector('footer').innerHTML = data))
  .catch(err => console.log('Footer Error: ' + err));

// 페이지 라우팅 로직
function loadPage(page) {
  fetch(`src/views/${page}.html`)
    .then(res => res.text())
    .then(data => (document.getElementById('main').innerHTML = data))
    .catch(err => console.log('Page Load Error', err));
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
