// login.js
import { loginUser } from '/src/js/api.js'; // api.js에서 import

export function login() {
  const loginButton = document.getElementById('login');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  loginButton.addEventListener('click', async () => {
    try {
      const data = await loginUser({
        email: emailInput.value,
        password: passwordInput.value,
      });

      saveToken(data.item.token.accessToken);
      navigate('home');
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  });

  function saveToken(token) {
    sessionStorage.setItem('accessToken', token);
  }
}
