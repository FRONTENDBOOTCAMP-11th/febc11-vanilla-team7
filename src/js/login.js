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
            console.log('로그인 응답 데이터:', data); // 전체 응답 데이터 확인

            // 토큰 확인
            if (data.token && data.token.accessToken) {
                console.log('토큰:', data.token.accessToken); // 토큰값 확인
            }

            if (data.ok === 1) {
                // 토큰 저장
                if (data.token && data.token.accessToken) {
                    sessionStorage.setItem('accessToken', data.token.accessToken);
                }
                
                // 로그인 상태와 사용자 정보 저장
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userInfo', JSON.stringify({
                    email: data.item.email,
                    name: data.item.name
                }));

                console.log('세션스토리지 저장 후:', {
                    token: sessionStorage.getItem('accessToken'),
                    isLoggedIn: sessionStorage.getItem('isLoggedIn'),
                    userInfo: sessionStorage.getItem('userInfo')
                });

                alert('로그인 성공!');
               // window.location.href = '/home';
            } else {
                alert(data.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    });

    // 콘솔에서 로그인 상태 확인 가능하도록
    window.checkLoginState = function() {
        console.log('현재 로그인 상태:', {
            token: sessionStorage.getItem('accessToken'),
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            userInfo: sessionStorage.getItem('userInfo')
        });
    }
}