function initializePage() {
  ('use strict');

  // DOM 노드 추가
  const alignButton = document.getElementById('align');
  const title = document.getElementById('title');
  const subtitle = document.getElementById('subtitle');
  const content = document.getElementById('contents');
  const keyboardButton = document.getElementById('keyboard');

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
      keyboardImg.src = 'src/assets/icons/keyboard-on.svg';
    } else {
      keyboardImg.src = 'src/assets/icons/keyboard-hide.svg';
    }
  }

  // input 이벤트 리스너 등록 (실시간으로 내용 변화 감지)
  [title, subtitle, content].forEach(element => {
    element.addEventListener('input', checkAllFields);
  });

  // 초기 상태 체크
  checkAllFields();

  //데이터 전송
  async function postBrunchData(url, data) {
    try {
      const response = await fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': 'vanilla07',
          Authorization: `Bearer ${token}`, // 토큰 추가
        },
        body: JSON.stringify({
          type: 'brunch', // type 필드 추가
          title: data.title,
          subtitle: data.subtitle,
          content: data.content,
          user: {
            // user 정보 추가
            id: 1, // 실제 사용자 ID로 변경
            name: '사용자', // 실제 사용자 이름으로 변경
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`,
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
      throw error;
    }
  }

  const submitButton = document.getElementById('done');

  submitButton.addEventListener('click', async () => {
    try {
      const brunchData = {
        title: document.getElementById('title').value,
        subtitle: document.getElementById('subtitle').value,
        content: document.getElementById('contents').value,
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
      const result = await postBrunchData('https://11.fesp.shop', brunchData);
      console.log('저장 성공:', result);

      // 성공 시 처리
      if (result) {
        // success 체크를 제거하고 result 존재 여부만 확인
        alert('저장되었습니다.');
        window.location.href = '/home.html';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  });

  //로그인
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLTsp4AiLCJlbWFpbCI6ImFkbWluQGZlc3Auc2hvcCIsImltYWdlIjoiL2ZpbGVzL3ZhbmlsbGEwNy91c2VyLW11emkud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzI5NjY2MzcyLCJleHAiOjE3Mjk3NTI3NzIsImlzcyI6IkZFU1AifQ.6aVH5caA1jBit60e7R0cmhlTEyBHJzfRITvOaeYtcy8';
  async function loginUser() {
    const postUrl = 'https://11.fesp.shop/posts';

    try {
      const response = await fetch(postUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'client-id': 'vanilla07', // client-id 추가
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('로그인 성공:', data);
      return data;
    } catch (error) {
      console.error('로그인 에러:', error);
      throw error;
    }
  }

  // 함수 실행
  loginUser()
    .then(data => {
      // 성공 시 처리
      console.log('데이터:', data);
    })
    .catch(error => {
      // 에러 처리
      console.error('Error:', error);
    });
}
