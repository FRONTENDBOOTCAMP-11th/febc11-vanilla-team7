import {
  getSubscribedWriters,
  getPostById,
  getMyBrunchData,
  getBookmarkedPosts,
} from './api.js';

export function mybox() {
  // 공통으로 사용되는 색상 배열
  const cardColors = [
    'wheat',
    'crimson',
    'orangered',
    'firebrick',
    'lightsalmon',
    'orange',
    'peru',
    'khaki',
    'yellowcreen',
    'darksalmon',
    'tomato',
    'bisque',
    'maroon',
    'sienna',
    'forestgreen',
    'darkgreen',
    'cadetblue',
    'teal',
    'aqua',
    'steelblue',
    'lightsteelblue',
    'darkslateblue',
    'mediumpurple',
    'plum',
  ];

  // 포스트 카드 HTML 생성 함수
  function createPostCard(post, color) {
    return `
            <div style="background-color: ${color}" class="w-[122px] h-[172px] rounded-lg flex justify-center items-center p-4">
                <div class="bg-white w-full h-[80%] p-2 relative">
                    <h3 class="text-xs font-light text-gray-800 line-clamp-2">
                        ${post.title}
                    </h3>
                    <span class="text-xs font-light text-gray-600 absolute bottom-2 left-2">
                        ${post.user?.name || '작가명'}
                    </span>
                </div>
            </div>
            <div class="mt-4 text-center">
                <h3 class="font-semibold text-xs line-clamp-2">${post.title}</h3>
                <span class="text-gray-500 text-xs">by ${post.user?.name || '작가명'}</span>
            </div>
        `;
  }

  // 관심 작가
  function renderWriter() {
    const container = document.getElementById('writer-section');
    if (!container) return;

    getSubscribedWriters()
      .then(data => {
        const writers = data.item;
        if (!writers?.length) {
          container.innerHTML =
            '<p class="text-gray-500">구독중인 작가가 없습니다.</p>';
          return;
        }

        container.innerHTML = writers
          .map(
            writer => `
                    <div class="flex flex-col items-center flex-shrink-0 cursor-pointer" 
                         onclick="window.navigate('writerHome', null, '${writer._id}')">
                        <img src="${writer.image || '/src/assets/person/person.svg'}"
                             class="w-20 h-20 rounded-full" />
                        <span class="text-sm text-gray-500 mt-1">${writer.name}</span>
                    </div>
                `,
          )
          .join('');
      })
      .catch(error => console.error('구독 작가 로드 실패:', error));
  }

  // 최근 본 글
  async function renderRecentPosts() {
    const container = document.getElementById('recent-section');
    const recentPosts = JSON.parse(localStorage.getItem('recentPosts') || '[]');

    if (!recentPosts.length) {
      container.innerHTML =
        '<p class="text-gray-500">최근 본 글이 없습니다.</p>';
      return;
    }

    try {
      // 모든 포스트 데이터를 한 번에 가져옴
      const postsData = await Promise.all(
        recentPosts.map(postId => getPostById(postId)),
      );

      container.innerHTML = ''; // 컨테이너 초기화

      // 최신 순으로 정렬되어 있는 포스트들을 렌더링
      postsData.forEach(({ item: post }) => {
        const randomColor =
          cardColors[Math.floor(Math.random() * cardColors.length)];
        const postNode = document.createElement('div');
        postNode.className =
          'max-w-[122px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity';
        postNode.innerHTML = createPostCard(post, randomColor);
        postNode.onclick = () => window.navigate('post', null, post._id);
        container.appendChild(postNode);
      });
    } catch (error) {
      console.error('최근 본 글 로드 실패:', error);
      container.innerHTML =
        '<p class="text-gray-500">글을 불러오는데 실패했습니다.</p>';
    }
  }

  // 관심 글
  function renderInterestPosts() {
    const container = document.getElementById('interest-section');
    if (!container) return;

    getBookmarkedPosts()
      .then(data => {
        const likedPosts = data.item.filter(
          bookmark => bookmark.extra?.type === 'post' && bookmark.extra?.like,
        );

        if (!likedPosts.length) {
          container.innerHTML =
            '<p class="text-gray-500">관심 글이 없습니다.</p>';
          return;
        }

        container.innerHTML = '';
        likedPosts.forEach(bookmark => {
          const postNode = document.createElement('div');
          postNode.className =
            'max-w-[122px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity';
          postNode.innerHTML = createPostCard(
            bookmark.post,
            cardColors[Math.floor(Math.random() * cardColors.length)],
          );
          postNode.onclick = () =>
            window.navigate('post', null, bookmark.post._id);
          container.appendChild(postNode);
        });
      })
      .catch(error => console.error('관심 글 로드 실패:', error));
  }

  // 내 브런치
  function renderMyBrunch() {
    const userId = sessionStorage.getItem('id');
    const userName = sessionStorage.getItem('name');
    const brunchSection = document.getElementById('brunch-section');
    if (!brunchSection) return;

    getMyBrunchData()
      .then(data => {
        const myPosts = data.item
          .filter(
            post =>
              post.user._id === parseInt(userId) && post.user.name === userName,
          )
          .slice(0, 3);

        brunchSection.innerHTML = myPosts
          .map(
            post => `
                    <div class="text-[17px] px-6 py-4 border-t -mx-6 text-black">${post.title}</div>
                    <div class="text-[12px] px-6 pb-4 -mx-6 text-gray-500">${post.content}</div>
                `,
          )
          .join('');
      })
      .catch(error => console.error('내 브런치 로드 실패:', error));
  }

  // 초기화 및 이벤트 리스너
  document.getElementById('reset')?.addEventListener('click', () => {
    localStorage.removeItem('recentPosts');
    renderRecentPosts();
  });

  // 렌더링 실행
  renderWriter();
  renderRecentPosts();
  renderMyBrunch();
  renderInterestPosts();
}
