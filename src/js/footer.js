export function footer() {
  console.log('footer');
  const home = document.getElementById('home');
  const search = document.getElementById('search');
  const write = document.getElementById('write');
  const mybox = document.getElementById('mybox');

  home.addEventListener('click', () => {
    navigate('home');
  });

  search.addEventListener('click', () => {
    navigate('search');
  });

  write.addEventListener('click', () => {
    navigate('write');
  });

  mybox.addEventListener('click', () => {
    navigate('mybox');
  });
}
