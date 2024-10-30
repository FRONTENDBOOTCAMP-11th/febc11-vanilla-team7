export function login() {
    const loginButton = document.getElementById('login');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
 
    // 로그인 버튼 클릭 이벤트
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
 
            if (data.ok === 1) {
                // accessToken 저장 - token 객체에서 직접 접근
                sessionStorage.setItem('accessToken', data.item.accessToken);
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userInfo', JSON.stringify({
                    email: data.item.email,
                    name: data.item.name
                }));
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