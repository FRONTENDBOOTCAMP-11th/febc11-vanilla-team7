export function mybox() {
   // 토큰 체크 추가
   const token = sessionStorage.getItem('token');
   if (!token) {
       // 현재 페이지 URL 저장 후 로그인 페이지로 이동
       sessionStorage.setItem('prevPage', window.location.pathname);
       window.location.href = '/login';
       return;
   }

   let url = 'https://11.fesp.shop';

  async function writerData(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
        Authorization: `Bearer ${token}`, // 토큰 추가
      },
    });

    // 토큰 만료 체크 추가
    if (response.status === 401) {
      sessionStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }

    return response.json();
  }

  function renderWriter() {
    writerData(`${url}/users?sort={"bookmarkedBy.users":-1}&limit=4`)
      .then(data => {
        const writers = data.item;
        const container = document.getElementById('writer-section');

        writers.forEach(writer => {
          const writerImage = writer.image || '/src/assets/person/person.svg';
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
          // writerNode.addEventListener('click', () => goWriterPage(writer._id));
        });
      })
      .catch(error => console.error('Error:', error));
  }

  function goWriterPage(userId) {
    navigate('writerHome', null, userId);
  }

   // 페이지 로드 시 작가 데이터 렌더링
   renderWriter();
}