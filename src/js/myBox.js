export function mybox() {
  let url = 'https://11.fesp.shop';

  async function writerData(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
    });
    return response.json();
  }

  function renderWriter() {
    // URL 수정: 인기 작가 4명 데이터 가져오기 위한 정렬 조건 추가
    writerData(`${url}/users?sort={"bookmarkedBy.users":-1}&limit=4`).then(data => {
      const writers = data.item;
      const container = document.getElementById('writer-section');
      
      // HTML 구조 수정
      writers.forEach(writer => {
        const writerImage = writer.image || '/src/assets/person/person.svg';

        // div를 직접 생성하고 클래스 추가
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
        writerNode.addEventListener('click', () => goWriterPage(writer._id));
      });
    })
    .catch(error => console.error('Error:', error)); // 에러 처리 추가
  }

  function goWriterPage(userId) {
    navigate('writerHome', null, userId);
  }

  // 페이지 로드 시 작가 데이터 렌더링
  renderWriter();
}