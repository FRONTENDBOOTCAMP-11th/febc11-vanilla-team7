console.log('home');

const url = 'https://11.fesp.shop/posts';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLTsp4AiLCJlbWFpbCI6ImFkbWluQGZlc3Auc2hvcCIsImltYWdlIjoiL2ZpbGVzL3ZhbmlsbGEwNy91c2VyLW11emkud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzI5NjQyMzQ1LCJleHAiOjE3Mjk3Mjg3NDUsImlzcyI6IkZFU1AifQ.dBC0Q_Lmar0R4bV62i7SLoLQQUEqjZGFQKJljCjW-SA';

fetch(url, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
    'Content-Type': 'application/json', // 요청 타입 명시 (필요시)
  },
})
  .then(res => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json(); // 응답을 JSON 형식으로 변환
  })
  .then(data => console.log(data)) // 응답 데이터 출력
  .catch(error => console.error('Error:', error)); // 에러 처리
