import { loginUser } from '/src/js/api.js';

export function login() {
   // DOM 요소
   const elements = {
       loginBtn: document.getElementById('login'),
       email: document.getElementById('email'),
       password: document.getElementById('password')
   };

   // 사용자 정보 저장 함수
   const saveUserData = (userData) => {
       // 토큰 저장
       const { accessToken, refreshToken } = userData.item.token;
       sessionStorage.setItem('accessToken', accessToken);
       sessionStorage.setItem('refreshToken', refreshToken);

       // 사용자 정보 저장
       const { _id, name, email } = userData.item;
       sessionStorage.setItem('id', _id);
       sessionStorage.setItem('name', name);
       sessionStorage.setItem('email', email);
   };

   // 로그인 처리 함수
   const handleLogin = async () => {
       try {
           // API 요청 데이터 준비
           const loginData = {
               email: elements.email.value,
               password: elements.password.value
           };

           // API 요청 설정
           const response = await fetch('https://11.fesp.shop/users/login', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'client-id': 'vanilla07'
               },
               body: JSON.stringify(loginData)
           });

           const data = await response.json();
           console.log('로그인 응답:', data);

           // 로그인 성공 처리
           if (data.ok === 1 && data.item) {
               saveUserData(data);
               alert('로그인 성공!');
               window.location.href = '/home';
               return;
           }

           // 로그인 실패 처리
           alert('로그인에 실패했습니다.');

       } catch (error) {
           console.error('로그인 에러:', error);
           alert('로그인 중 오류가 발생했습니다.');
       }
   };

   // 이벤트 리스너 설정
   elements.loginBtn.addEventListener('click', handleLogin);
}