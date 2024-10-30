export function login() {
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const checkbox = document.getElementById('login_checkbox');
        const loginButton = document.getElementById('login');
    
        // 저장된 로그인 정보 불러오기
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            checkbox.checked = true;
        }
    
        // form submit 이벤트로 변경
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // 폼 기본 제출 동작 방지
    
            try {
                // 이메일과 패스워드 값 유효성 검사
                if (!emailInput.value) {
                    alert('이메일을 입력해주세요.');
                    return;
                }
                if (!passwordInput.value) {
                    alert('비밀번호를 입력해주세요.');
                    return;
                }
    
                const response = await fetch('https://11.fesp.shop/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'client-id': 'vanilla07'
                    },
                    body: JSON.stringify({
                        "email": emailInput.value.trim(),
                        "password": passwordInput.value.trim()
                    })
                });
    
                const data = await response.json();
    
                if (data.ok === 1) {
                    // 로그인 성공 시 처리
                    if (checkbox.checked) {
                        localStorage.setItem('savedEmail', emailInput.value);
                    } else {
                        localStorage.removeItem('savedEmail');
                    }
    
                    if (data.token && data.token.accessToken) {
                        localStorage.setItem('token', data.token.accessToken);
                    }
                    console.log('로그인 성공');
                    
                    window.location.href = '/home.html';
                } else {
                    alert(data.message || '로그인에 실패했습니다.');
                }
            } catch (error) {
                console.error('로그인 에러:', error);
                alert('로그인 중 오류가 발생했습니다.');
            }
        });
    
        // 이메일/비밀번호 입력 시 로그인 버튼 활성화
        function updateLoginButton() {
            const isEmailValid = emailInput.value.trim() !== '';
            const isPasswordValid = passwordInput.value.trim() !== '';
            
            if (isEmailValid && isPasswordValid) {
                loginButton.classList.remove('bg-[#aaa]');
                loginButton.classList.add('bg-[#00c6be]');
                loginButton.disabled = false;
            } else {
                loginButton.classList.remove('bg-[#00c6be]');
                loginButton.classList.add('bg-[#aaa]');
                loginButton.disabled = true;
            }
        }
    
        emailInput.addEventListener('input', updateLoginButton);
        passwordInput.addEventListener('input', updateLoginButton);
    
        // 초기 버튼 상태 설정
        updateLoginButton();
    });
}