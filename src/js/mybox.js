import { writerData, getPostById, getMyBrunchData } from './api.js';

export function mybox() {
  const token = sessionStorage.getItem('accessToken');
  //console.log(token);

  //관심 작가
  function renderWriter() {
    writerData()
      .then(data => {
        const writers = data.item;
        const container = document.getElementById('writer-section');

        writers.forEach(writer => {
          const writerImage =
            writer.image || '/public/assets/person/person.svg';
          const writerNode = document.createElement('div');
          writerNode.className = 'flex flex-col items-center flex-shrink-0';

          writerNode.innerHTML = `
                       <img
                           src="${writerImage}"
                           class="w-20 h-20 rounded-full"
                       />
                       <span class="text-sm text-gray-500 mt-1">${writer.name}</span>
                   `;

          container.appendChild(writerNode);

          writerNode.addEventListener('click', () => {
            window.navigate('writerHome', null, writer._id);
          });
        });
      })
      .catch(error => console.error('Error:', error));
  }

  //최근 본 글
  function renderRecentPosts() {
    const recentPosts = JSON.parse(localStorage.getItem('recentPosts') || '[]');
    const container = document.getElementById('recent-section');

    if (!container) {
      console.error('최근 본 글 컨테이너를 찾을 수 없습니다.');
      return;
    }

    if (recentPosts.length === 0) {
      container.innerHTML =
        '<p class="text-gray-500">최근 본 글이 없습니다.</p>';
      return;
    }

    container.innerHTML = '';

    const colors = [
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

    recentPosts.forEach(async postId => {
      try {
        const data = await getPostById(postId);
        const post = data.item;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const postNode = document.createElement('div');
        postNode.className =
          'max-w-[122px] flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity';
        postNode.innerHTML = `
                   <div style="background-color: ${randomColor}" class="w-[122px] h-[172px] rounded-lg flex justify-center items-center p-4">
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

        container.appendChild(postNode);

        postNode.addEventListener('click', () => {
          window.navigate('post', null, post._id);
        });
      } catch (error) {
        console.error('포스트 로드 실패:', error);
      }
    });
  }

  // reset 버튼 클릭 이벤트 추가
  const resetButton = document.getElementById('reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      localStorage.removeItem('recentPosts');
      renderRecentPosts();
    });
  }

  //내 브런치
  function renderMyBrunch() {
    const userId = sessionStorage.getItem('id');
    const userName = sessionStorage.getItem('name');

    getMyBrunchData()
      .then(data => {
        // 사용자의 포스트만 필터링
        const myPosts = data.item.filter(
          post =>
            post.user._id === parseInt(userId) && post.user.name === userName,
        );

        // 최대 3개까지만 표시
        const limitedPosts = myPosts.slice(0, 3);

        // brunch-section을 찾아서 내용을 추가
        const brunchSection = document.getElementById('brunch-section');
        if (brunchSection) {
          // 기존 내용 초기화
          brunchSection.innerHTML = '';

          // 포스트 추가
          limitedPosts.forEach(post => {
            brunchSection.innerHTML += `
                        <div class="text-[17px] px-6 py-4 border-t -mx-6 text-black">
                            ${post.title}
                        </div>
                        <div class="text-[12px] px-6 pb-4 -mx-6 text-gray-500">
                            ${post.content}
                        </div>
                    `;
          });
        }
      })
      .catch(error => console.error('내 브런치 로드 실패:', error));
  }

  renderWriter();
  renderRecentPosts();
  renderMyBrunch();
}
