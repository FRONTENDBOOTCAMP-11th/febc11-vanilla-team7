function initializePage() {
  console.log('search');

  const url = 'https://11.fesp.shop';

  async function searchData(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
    });

    return response.json();
  }

  function renderSearch() {
    const inputNode = document.getElementById('search');

    inputNode.addEventListener('input', event => {
      const keyword = event.target.value;
      console.log(keyword);

      searchData(`${url}/posts?type=brunch&keyword=${keyword}`).then(data => {
        const brunches = data.item;

        brunches.forEach(brunch => {
          console.log(brunch.title);
          console.log(brunch.content);
          console.log(brunch.createdAt);
          console.log(brunch.user.name);
        });
      });
    });
  }
  renderSearch();
}
