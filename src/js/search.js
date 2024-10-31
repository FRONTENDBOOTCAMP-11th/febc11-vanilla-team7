import { searchData } from '/src/js/api.js';

export function search() {
  console.log('search');

  let activeTab = 'article';

  function goPostPage(postId) {
    navigate('post', postId);
  }

  function renderSearch() {
    const inputNode = document.getElementById('searchInput');
    const articleResults = document.getElementById('articleResults');
    const authorResults = document.getElementById('authorResults');
    const searchTab = document.getElementById('searchTab');
    const articleSection = document.querySelectorAll('section')[2];
    const authorSection = document.querySelectorAll('section')[3];
    const noResultsMessage = document.createElement('div');

    noResultsMessage.innerText = '검색 결과가 없습니다.';
    noResultsMessage.className =
      'text-center text-gray-500 text-lg font-medium mt-10 hidden';
    noResultsMessage.style.position = 'absolute';
    noResultsMessage.style.top = '50%';
    noResultsMessage.style.left = '50%';
    noResultsMessage.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(noResultsMessage);

    const recommendationSection = document.querySelector(
      'section:nth-of-type(1)',
    );
    const recentSearchSection = document.querySelector(
      'section:nth-of-type(2)',
    );

    inputNode.addEventListener('input', event => {
      const keyword = event.target.value.trim();

      if (keyword) {
        searchTab.classList.remove('hidden');
        recommendationSection.classList.add('hidden');
        recentSearchSection.classList.add('hidden');
      } else {
        searchTab.classList.add('hidden');
        recommendationSection.classList.remove('hidden');
        recentSearchSection.classList.remove('hidden');
        noResultsMessage.classList.add('hidden');
        articleResults.innerHTML = '';
        authorResults.innerHTML = '';
        articleSection.classList.add('hidden');
        authorSection.classList.add('hidden');
        return;
      }

      const endpoint =
        activeTab === 'article'
          ? `/posts?type=brunch&keyword=${keyword}`
          : `/posts?type=brunch&custom={"user.name":"${keyword}"}`;

      searchData(endpoint)
        .then(data => {
          const items = data.item || [];
          if (items.length === 0) {
            noResultsMessage.classList.remove('hidden');
            articleSection.classList.add('hidden');
            authorSection.classList.add('hidden');
          } else {
            noResultsMessage.classList.add('hidden');

            if (activeTab === 'article') {
              articleResults.innerHTML = '';
              items.forEach(brunch => {
                const result = document.createElement('div');
                result.className = 'bg-white p-5 cursor-pointer';
                result.innerHTML = `
                <h3 class="text-lg text-gray-600 mb-2">${brunch.title}</h3>
                <p class="text-sm text-[#959595] line-clamp-3 mb-4">${brunch.content}</p>
                <div class="text-xs text-[#828282]">
                  <span class="c-text-writer text-sm font-light leading-5">${brunch.createdAt}</span> · <span class="c-text-writer text-sm font-light leading-5">
                <italic class="font-georgia c-text-by italic">by </italic>${brunch.user.name}</span>
                </div>
              `;

                result.addEventListener('click', () => goPostPage(brunch._id));
                articleResults.appendChild(result);
              });
              articleSection.classList.remove('hidden');
              authorSection.classList.add('hidden');
            } else if (activeTab === 'author') {
              authorResults.innerHTML = '';
              items.forEach(author => {
                console.log(author);
                const result = document.createElement('div');
                result.className =
                  'bg-white rounded-lg p-5 shadow-md flex items-center space-x-4';
                result.innerHTML = `
                <div class="w-16 h-16 bg-gray-100 overflow-hidden">
                  <img src="${author.user.image || 'default-profile.jpg'}" alt="${author.user.name} Profile" class="object-cover w-full h-full">
                </div>
                <div>
                  <h3 class="text-lg text-gray-600 mb-2">${author.user.name}</h3>
                  <p class="text-sm text-[#959595] line-clamp-3 mb-4">${author.title}</p>
                </div>
              `;
                authorResults.appendChild(result);
                result.addEventListener('click', () => {
                  window.navigate('writerHome', null, author.user._id);
              });
              });
              authorSection.classList.remove('hidden');
              articleSection.classList.add('hidden');
            }
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          noResultsMessage.innerText = '검색 중 오류가 발생했습니다.';
          noResultsMessage.classList.remove('hidden');
        });
    });
  }

  const inputNode = document.getElementById('searchInput');

  document.getElementById('articleTab').addEventListener('click', () => {
    activeTab = 'article';
    document.getElementById('articleTab').classList.add('text-[#00c6ee]');
    document.getElementById('authorTab').classList.remove('text-[#02c6ed]');
    const keyword = inputNode.value.trim();
    if (keyword) inputNode.dispatchEvent(new Event('input'));
  });

  document.getElementById('authorTab').addEventListener('click', () => {
    activeTab = 'author';
    document.getElementById('authorTab').classList.add('text-[#02c6ed]');
    document.getElementById('articleTab').classList.remove('text-[#00c6ee]');
    const keyword = inputNode.value.trim();
    if (keyword) inputNode.dispatchEvent(new Event('input'));
  });

  renderSearch();
}
