document.addEventListener('DOMContentLoaded', () => {
  initializePage();
});

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


document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const defaultSection = document.getElementById("defaultSection");

  // 검색어 입력 시 구조 변경
  searchInput.addEventListener("input", function () {
      const searchValue = searchInput.value;

      if (searchValue.trim() !== "") {
          // 검색어가 입력되면 기존 구조를 변경
          defaultSection.innerHTML = `
            <nav class="shadow-md bg-white">
              <div class="px-11 mx-auto flex justify-between items-center">
                <div class="relative w-full my-[20px]">
                  <input type="search" class="text-center w-full text-[24px]" placeholder="검색어 입력" value="${searchValue}" />
                </div>
              </div>
              <div class="flex text-[14px] text-[#666]">
                <button id="articleTab" class="flex-grow py-2">글</button>
                <button id="authorTab" class="flex-grow">작가</button>
              </div>
            </nav>
            <section class="p-5">
              <h1 class="text-[12px] text-[#959595]">글 검색 결과</h1>
            </section>
          `;
      } else {
          // 검색어가 비어 있으면 기본 구조로 돌아옴
          defaultSection.innerHTML = `
            <h1 class="text-[12px] text-[#bbb]">추천 작가 키워드</h1>
            <h2 class="my-[10px] text-[20px] text-[#333]">
              일상의 따뜻한 위로, <span class="text-[#00c6be]">그림</span> 작가를
              만나요
            </h2>
            <div class="mb-[10px]">
              <p
                class="inline-block text-[15px] text-[#959595] bg-white border border-[#ddd] rounded-3xl px-3 py-2"
              >
                한의사
              </p>
              <p
                class="inline-block text-[15px] text-[#959595] bg-white border border-[#ddd] rounded-3xl px-3 py-2"
              >
                출간작가
              </p>
              <p
                class="inline-block text-[15px] text-[#959595] bg-white border border-[#ddd] rounded-3xl px-3 py-2"
              >
                에세이스트
              </p>
            </div>
          `;
      }
  });
});
