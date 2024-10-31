import { loginUser } from '/src/js/api.js';

export function login() {
    const loginButton = document.getElementById('login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
 
    loginButton.addEventListener('click', async () => {
        try {
            const response = await fetch('https://11.fesp.shop/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'client-id': 'vanilla07'
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value
                })
            });
 
            const data = await response.json();
            console.log('로그인 응답:', data);
 
            if (data.ok === 1 && data.item) {
                // 토큰 저장
                sessionStorage.setItem('accessToken', data.item.token.accessToken);
                sessionStorage.setItem('refreshToken', data.item.token.refreshToken);
                
                // 사용자 정보 저장
                sessionStorage.setItem('id', data.item._id);
                sessionStorage.setItem('name', data.item.name);
                sessionStorage.setItem('email', data.item.email);
 
                alert('로그인 성공!');
                window.location.href = '/home';
            } else {
                alert('로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    });
 }