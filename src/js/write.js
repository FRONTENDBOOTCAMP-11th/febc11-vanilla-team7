console.log('write');
"use strict";

// DOM 노드 추가
const alignButton = document.getElementById('align');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const contents = document.getElementById('contents');
const keyboardButton = document.getElementById('keyboard');

// 정렬 상태를 추적하는 변수
let alignState = 'left'; // 초기 상태는 왼쪽 정렬

// 정렬 상태에 따른 이미지 경로와 정렬 스타일 일치시키기
const alignmentStates = {
    'left': {
        next: 'center',
        imgSrc: 'src/assets/icons/align-left.svg',
        style: 'text-left'
    },
    'center': {
        next: 'right',
        imgSrc: 'src/assets/icons/align-center.svg',
        style: 'text-center'
    },
    'right': {
        next: 'left',
        imgSrc: 'src/assets/icons/align-right.svg',
        style: 'text-right'
    }
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
    contents.classList.remove('text-left', 'text-center', 'text-right');
    
    // 새로운 정렬 클래스 추가
    title.classList.add(alignmentStates[alignState].style);
    subtitle.classList.add(alignmentStates[alignState].style);
    contents.classList.add(alignmentStates[alignState].style);
}

// 정렬 버튼 클릭 이벤트 리스너
alignButton.addEventListener('click', changeAlignment);



// 키보드 아이콘 상태 변경 함수
function updateKeyboardIcon(isFocused) {
    const keyboardImg = keyboardButton.querySelector('img');
    if (isFocused) {
        keyboardImg.src = 'src/assets/icons/keyboard-on.svg';
    } else {
        keyboardImg.src = 'src/assets/icons/keyboard-hide.svg';
    }
}


// 포커스 이벤트 리스너
function handleFocus() {
    updateKeyboardIcon(true);
}

function handleBlur(event) {
    // 다른 입력 필드로 포커스가 이동하는 경우를 체크
    const focusedElement = event.relatedTarget;
    const isStillFocused = 
        focusedElement === title || 
        focusedElement === subtitle || 
        focusedElement === contents;
    
    if (!isStillFocused) {
        updateKeyboardIcon(false);
    }
}

// 이벤트 리스너 등록
alignButton.addEventListener('click', changeAlignment);

// 포커스/블러 이벤트 리스너 등록
[title, subtitle, contents].forEach(element => {
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
});


async function postBrunchData(url, data) {
    
      const response = await fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': 'vanilla07'
        },
        body: JSON.stringify({
          type: 'brunch',  // brunch 타입으로 저장
          title: data.title,
          subtitle: data.subtitle,
          content: data.content
        })
      });
      return response.json();
}




//관리자로 로그인
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLTsp4AiLCJlbWFpbCI6ImFkbWluQGZlc3Auc2hvcCIsImltYWdlIjoiL2ZpbGVzL3ZhbmlsbGEwNy91c2VyLW11emkud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzI5NjY2MzcyLCJleHAiOjE3Mjk3NTI3NzIsImlzcyI6IkZFU1AifQ.6aVH5caA1jBit60e7R0cmhlTEyBHJzfRITvOaeYtcy8';  
const postUrl = 'https://11.fesp.shop/post'; 

fetch(postUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,  
    'Content-Type': 'application/json'   
  }
}).then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();  
  })
  .then(data => console.log(data))  
  .catch(error => console.error('Error:', error));