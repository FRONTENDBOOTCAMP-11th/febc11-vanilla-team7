import { uploadImage } from './api.js';

export function upload() {
  // 상수 및 상태 관리
  const state = { count: 0 };

  // DOM 요소 참조 객체
  const elements = {
    boxes: document.querySelectorAll('.upload-box'),
    counter: document.getElementById('current-count'),
    done: document.getElementById('done'),
    exit: document.getElementById('exit'),
  };

  // 이벤트 핸들러 객체
  const handlers = {
    // 이미지 업로드 처리 함수
    async handleUpload(box, file) {
      if (state.count >= 10) {
        alert(`최대 10개까지만 선택할 수 있습니다.`);
        return;
      }

      try {
        // 미리보기 이미지 생성 및 표시
        const preview = document.createElement('img');
        preview.src = URL.createObjectURL(file);
        preview.className = 'absolute inset-0 w-full h-full object-cover';

        const checkIcon = document.createElement('img');
        checkIcon.src = '/public/assets/icons/done-upload.svg';
        checkIcon.className = 'absolute top-2 right-2 w-[18px] h-[18px] z-10';

        box.append(preview, checkIcon);
        state.count++;

        // 서버 업로드 처리
        const response = await uploadImage(file);
        if (response.item) {
          localStorage.setItem('uploadedImage', response.item);
        }

        // UI 상태 업데이트
        elements.counter.textContent = state.count;
        elements.done.querySelector('img').src =
          `/public/assets/icons/done-${state.count > 0 ? 'on' : 'off'}.svg`;
      } catch (error) {
        console.error('업로드 실패:', error);
        box.innerHTML = '';
        state.count--;
        alert('이미지 업로드에 실패했습니다.');
      }
    },
  };

  // 이벤트 리스너 설정 및 초기화
  function initialize() {
    // 업로드 박스 클릭 이벤트 처리
    elements.boxes.forEach(box => {
      box.onclick = () => {
        if (!box.querySelector('img')) {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = e => {
            const file = e.target.files?.[0];
            if (file) handlers.handleUpload(box, file);
          };
          input.click();
        }
      };
    });

    // 완료 버튼 클릭 이벤트 처리
    elements.done.onclick = () => {
      if (state.count > 0) {
        window.navigate('write');
      } else {
        alert('이미지를 선택해주세요.');
      }
    };

    // 나가기 버튼 클릭 이벤트 처리
    elements.exit.onclick = () => window.navigate('home');
  }

  // 초기화 함수 실행
  initialize();
}
