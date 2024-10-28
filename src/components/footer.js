// footer.js
export function setupFooter() {
  // 모든 링크에 대한 클릭 이벤트 리스너 추가
  const links = document.querySelectorAll('#footer a');

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault(); // 기본 링크 클릭 동작 방지

      const page = link.id; // 클릭된 링크의 ID를 페이지 이름으로 사용
      navigate(page); // navigate 함수를 호출하여 페이지 전환
    });
  });
}
