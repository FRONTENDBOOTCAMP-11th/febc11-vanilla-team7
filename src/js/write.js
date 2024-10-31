import { postBrunchData } from './api.js';

export function write() {
  ('use strict');

  // DOM 노드 추가
  const alignButton = document.getElementById('align');
  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const content = document.getElementById('contents');
  const keyboardButton = document.getElementById('keyboard');
  const submitButton = document.getElementById('done');
  const exitButton = document.getElementById('exit');

  // exit 버튼 클릭 이벤트
  exitButton.addEventListener('click', () => {
    window.navigate('home');
  });

  // 정렬 상태를 추적하는 변수
  let alignState = 'left'; // 초기 상태는 왼쪽 정렬

  // 정렬 상태에 따른 이미지 경로와 정렬 스타일 일치시키기
  const alignmentStates = {
    left: {
      next: 'center',
      imgSrc: 'src/assets/icons/align-left.svg',
      style: 'text-left',
    },
    center: {
      next: 'right',
      imgSrc: 'src/assets/icons/align-center.svg',
      style: 'text-center',
    },
    right: {
      next: 'left',
      imgSrc: 'src/assets/icons/align-right.svg',
      style: 'text-right',
    },
  };

  // 정렬 변경 함수
  function changeAlignment() {
    // 다음 정렬 상태로 업데이트
    alignState = alignmentStates[alignState].next;

    // 이미지 변경
    alignButton.querySelector('img').src = alignmentStates[alignState].imgSrc;

    // 이전 정렬 클래스 모두 제거
    title.classList.remove('text-left', 'text-center', 'text-right');
    subtitle.classList.remove('text-left', 'text-center', 'text-right');
    content.classList.remove('text-left', 'text-center', 'text-right');

    // 새로운 정렬 클래스 추가
    title.classList.add(alignmentStates[alignState].style);
    subtitle.classList.add(alignmentStates[alignState].style);
    content.classList.add(alignmentStates[alignState].style);
  }

  // 정렬 버튼 클릭 이벤트 리스너
  alignButton.addEventListener('click', changeAlignment);

  // 모든 필드의 내용 확인 함수
  function checkAllFields() {
    const titleFilled = title.value.trim() !== '';
    const subtitleFilled = subtitle.value.trim() !== '';
    const contentFilled = content.value.trim() !== '';

    // 모든 필드가 채워져 있는지 확인
    const allFieldsFilled = titleFilled && subtitleFilled && contentFilled;

    // 키보드 아이콘 업데이트
    const keyboardImg = keyboardButton.querySelector('img');
    if (allFieldsFilled) {
      keyboardImg.src = '/public/assets/icons/keyboard-on.svg';
    } else {
      keyboardImg.src = '/public/assets/icons/keyboard-hide.svg';
    }
  }

  // input 이벤트 리스너 등록 (실시간으로 내용 변화 감지)
  [title, subtitle, content].forEach(element => {
    element.addEventListener('input', checkAllFields);
  });

  // 초기 상태 체크
  checkAllFields();

  submitButton.addEventListener('click', async () => {
    const id = sessionStorage.getItem('id');
    const name = sessionStorage.getItem('name');
    try {
      const brunchData = {
        title: document.getElementById('title').value,
        subtitle: document.getElementById('subtitle').value,
        content: document.getElementById('contents').value,
        user: {
          _id: id,
          name: name,
        },
      };

      // 데이터 유효성 검사
      if (
        !brunchData.title.trim() ||
        !brunchData.subtitle.trim() ||
        !brunchData.content.trim()
      ) {
        alert('빈칸이 있습니다. 내용을 입력해주세요.');
        return;
      }

      // API 호출
      const result = await postBrunchData(brunchData);
      console.log('저장 성공:', result);

      // 성공 시 처리
      if (result) {
        alert('저장되었습니다.');
        window.navigate('home');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  });
}
