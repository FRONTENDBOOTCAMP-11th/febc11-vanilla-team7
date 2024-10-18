// 모든 링크에 클릭 이벤트 추가
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function (event) {
    // 기본 동작(페이지 리프레시 방지)
    event.preventDefault();

    // 모든 아이콘을 다시 off 상태로 변경
    document.querySelectorAll('a').forEach(item => {
      const iconName = item.getAttribute('data-icon');
      const img = item.querySelector('img');
      img.src = `../assets/icons/${iconName}-off.svg`;
    });

    // 클릭한 링크의 아이콘을 on 상태로 변경
    const clickedIconName = this.getAttribute('data-icon');
    const clickedImg = this.querySelector('img');
    clickedImg.src = `../assets/icons/${clickedIconName}-on.svg`;
  });
});
