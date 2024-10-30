export function mybox() {
  const url = 'https://11.fesp.shop';

  async function fetchWriters() {
    try {
      const response = await fetch(`${url}/users?sort={"bookmarkedBy.users":-1}&limit=4`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'client-id': 'vanilla07'
        }
      });

      const data = await response.json();
      return data.item;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }

  // 작가 데이터를 화면에 표시하는 함수
  async function displayWriters() {
    const container = document.getElementById('writer-section');
    if (!container) return;

    const writers = await fetchWriters();
    
    writers.forEach(writer => {
      const writerNode = document.createElement('div');
      writerNode.className = 'flex flex-col items-center flex-shrink-0';
      writerNode.innerHTML = `
        <img 
          src="${writer.image || '/src/assets/person/person.svg'}" 
          class="w-20 h-20 rounded-full" 
          alt="${writer.name}"
        />
        <span class="text-sm text-gray-500 mt-1">${writer.name}</span>
      `;
      container.appendChild(writerNode);
    });
  }

  // 실행
  displayWriters();
}