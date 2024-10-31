import { postBrunchData } from './api.js';

export function write() {
  // 텍스트 정렬 상태 설정 객체
  const alignStates = {
    left: { next: 'center', imgSrc: 'align-left' },
    center: { next: 'right', imgSrc: 'align-center' },
    right: { next: 'left', imgSrc: 'align-right' },
  };

  // DOM 요소 참조 객체
  const elements = {
    align: document.getElementById('align'),
    title: document.getElementById('title'),
    subtitle: document.getElementById('subtitle'),
    content: document.getElementById('contents'),
    keyboard: document.getElementById('keyboard'),
    submit: document.getElementById('done'),
    exit: document.getElementById('exit'),
  };

  // 현재 정렬 상태 값
  let currentAlign = 'left';

  // 이벤트 처리 함수 모음
  const handlers = {
    // 텍스트 정렬 상태 변경 함수
    updateAlignment() {
      const next = alignStates[currentAlign];
      currentAlign = next.next;

      elements.align.querySelector('img').src =
        `/public/assets/icons/${next.imgSrc}.svg`;
      ['title', 'subtitle', 'content'].forEach(field => {
        elements[field].className = `text-${currentAlign}`;
      });
    },

    // 브런치 글 저장 함수
    async saveBrunch() {
      const isEmpty = ['title', 'subtitle', 'content'].some(
        field => !elements[field].value.trim(),
      );

      if (isEmpty) {
        alert('빈칸이 있습니다. 내용을 입력해주세요.');
        return;
      }

      try {
        await postBrunchData({
          type: 'brunch',
          title: elements.title.value,
          subtitle: elements.subtitle.value,
          content: elements.content.value,
          // image: localStorage.getItem('uploadedImage'), 안됨...
          user: {
            _id: sessionStorage.getItem('id'),
            name: sessionStorage.getItem('name'),
          },
        });

        // localStorage.removeItem('uploadedImage'); 안됨..
        alert('저장되었습니다.');
        window.navigate('home');
      } catch (error) {
        console.error('저장 실패:', error);
        alert('저장에 실패했습니다.');
      }
    },

    // 키보드 아이콘 업데이트 함수
    updateKeyboardIcon() {
      const isValid = ['title', 'subtitle', 'content'].every(field =>
        elements[field].value.trim(),
      );

      let iconState;
      if (isValid) {
        iconState = 'on';
      } else {
        iconState = 'hide';
      }
      elements.keyboard.querySelector('img').src =
        `/public/assets/icons/keyboard-${iconState}.svg`;
    },
  };

  // 초기 이벤트 리스너 설정 및 상태 초기화
  function initialize() {
    elements.exit.onclick = () => window.navigate('home');
    elements.align.onclick = handlers.updateAlignment;
    elements.submit.onclick = handlers.saveBrunch;

    ['title', 'subtitle', 'content'].forEach(field => {
      elements[field].oninput = handlers.updateKeyboardIcon;
    });

    handlers.updateKeyboardIcon();
  }

  initialize();
}
