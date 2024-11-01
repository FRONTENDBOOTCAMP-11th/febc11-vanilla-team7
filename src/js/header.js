export function header() {
  console.log('header');

  const searchButton = document.getElementById('search-button');

  console.log(searchButton);
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      navigate('search');
    });
  }
}
