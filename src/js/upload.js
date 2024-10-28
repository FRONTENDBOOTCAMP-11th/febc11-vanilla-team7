function initializePage() {
 ("use strict");
console.log("d");

// DOM 요소 선택
const uploadBoxes = document.querySelectorAll('.upload-box');//getElementById는 단일 요소만, querySelectorAll는 여러 요소를 한번에 선택 그리고 이상하게 getElementById 사용하니 에러생김;;
const currentCount = document.getElementById('current-count');
const doneButton = document.getElementById('done');
let selectedCount = 0;

// 이미지 카운터 업데이트 함수
function updateCounter() {
    currentCount.textContent = selectedCount; //HTMLElement.innerText대신 사용 차이점 및 좋은 이유 https://developer.mozilla.org/ko/docs/Web/API/Node/textContent(한번 써보고 싶어서 넣음)
    
    // 이미지가 선택되었을 때 done 버튼 활성화
    if (selectedCount > 0) {
        doneButton.querySelector('img').src = 'src/assets/icons/done-on.svg';
    } else {
        doneButton.querySelector('img').src = 'src/assets/icons/done-off.svg';
    }
}

// 이미지 선택 완료 표시 함수
function addDoneIcon(container) {
    const doneIcon = document.createElement('img');
    doneIcon.src = 'src/assets/icons/done-upload.svg';
    doneIcon.className = 'absolute top-2 right-2 w-[18px] h-[18px] z-10';
    container.appendChild(doneIcon);
}

// 이미지 미리보기 생성 함수
function createPreview(container, file) {
    // 최대 선택 개수 체크
    if (selectedCount >= 10) {
        alert('최대 10개까지만 선택할 수 있습니다.');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        // 이미지 미리보기 요소 생성
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'w-full h-full object-cover absolute top-0 left-0';
        
        // 기존 이미지가 없을 때만 추가
        if (!container.querySelector('img:not([src*="done-upload"])')) {
            container.appendChild(img);
            addDoneIcon(container);
            selectedCount++;
            updateCounter();
        }
    };
    
    reader.readAsDataURL(file);
}

// 각 업로드 박스에 클릭 이벤트 추가
uploadBoxes.forEach(box => {
    box.addEventListener('click', () => {
        // 이미 이미지가 있는 경우 무시
        if (box.querySelector('img:not([src*="done-upload"])')) {
            return;
        }
        
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            if (e.target.files && e.target.files[0]) {
                createPreview(box, e.target.files[0]);
            }
        };
        
        input.click();
    });
});

// 초기 카운터 설정
updateCounter();

}