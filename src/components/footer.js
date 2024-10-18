const liNodes = document.querySelectorAll('li');

liNodes.forEach(liNode => {
  liNode.addEventListener('click', event => {
    // 기본 동작 방지

    event.preventDefault();
    let image = liNode.querySelector('img');

    console.log('ㅎㅎ');

    image.src = image.src.includes('off.svg')
      ? image.src.replace('off.svg', 'on.svg')
      : image.src.replace('on.svg', 'off.svg');
  });
});
