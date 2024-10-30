export function signup() {
  console.log('signup');
  const url = 'https://11.fesp.shop';

  let nicknameButton = false;
  let emailButton = false; // 이메일 중복 체크 버튼 상태 추가

  register();

  async function registerData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async function checkNameDuplicate(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
    });

    return response.json();
  }

  async function checkEmailDuplicate(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'vanilla07',
      },
    });

    return response.json();
  }

  function register() {
    const registerButton = document.getElementById('register');
    const nicknameCheckButton = document.getElementById('checkNickname');
    const emailCheckButton = document.getElementById('checkEmail'); // 이메일 중복 체크 버튼

    // 닉네임 중복 체크
    nicknameCheckButton.addEventListener('click', async e => {
      e.preventDefault();
      const nickname = document.getElementById('nickname').value;
      const isUnique = await checkNickname(nickname);
      handleNicknameCheckResult(isUnique, nickname);
    });

    // 이메일 중복 체크
    emailCheckButton.addEventListener('click', async e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const isUnique = await checkEmail(email);
      handleEmailCheckResult(isUnique, email);
    });

    // 회원가입 버튼 클릭
    registerButton.addEventListener('click', async e => {
      e.preventDefault();
      const { nickname, email, password, passwordCheck } = getFormData();

      // 중복 확인 여부 체크
      if (!nicknameButton || !emailButton) {
        alert('닉네임 및 이메일 중복 확인을 먼저 해주세요.');
        return;
      }

      // 입력값 유효성 검사
      const isEmailValid = printEmailError(email);
      const isPasswordValid = printPasswordError(password, passwordCheck);

      // 모든 유효성 검사 통과 시 회원가입 진행
      if (isEmailValid && isPasswordValid) {
        const userData = {
          name: nickname,
          email,
          password,
          type: 'user',
        };

        console.log(userData);
        try {
          const result = await registerData(`${url}/users`, userData);
          // 회원가입 성공 후 처리 (예: 성공 메시지 출력, 리다이렉션 등)
          console.log('회원가입 성공:', result);
          alert('회원가입이 완료되었습니다.');
          // 필요에 따라 페이지 리다이렉션
          window.location.href = '/login'; // 로그인 페이지로 리다이렉트
        } catch (error) {
          console.error('회원가입 실패:', error);
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      }
    });
  }

  async function checkNickname(nickname) {
    try {
      const data = await checkNameDuplicate(
        `${url}/users/name?name=${nickname}`,
      );
      return data.ok;
    } catch (error) {
      console.error(error);
      alert('닉네임 중복 체크에 오류가 발생했습니다.');
      return false;
    }
  }

  async function checkEmail(email) {
    try {
      const data = await checkEmailDuplicate(
        `${url}/users/email?email=${email}`,
      );
      return data.ok;
    } catch (error) {
      console.error(error);
      alert('이메일 중복 체크에 오류가 발생했습니다.');
      return false;
    }
  }

  function handleNicknameCheckResult(isUnique, nickname) {
    const nicknameError = document.getElementById('nicknameError');
    const nicknameCheckButton = document.getElementById('checkNickname');
    nicknameError.innerHTML = ''; // 이전 에러 메시지를 제거

    const errorMsgNickname = document.createElement('p');
    if (nickname.length < 1) {
      errorMsgNickname.textContent = '별명을 입력해주세요.';
      errorMsgNickname.classList.add('text-[#FC3B75]');
      nicknameCheckButton.classList.remove('text-white', 'bg-[#00c6be]');
    } else if (isUnique) {
      nicknameButton = true;
      errorMsgNickname.textContent = '사용 가능한 별명입니다.';
      errorMsgNickname.classList.add('text-[#00c6be]');
      nicknameCheckButton.classList.add('text-white', 'bg-[#00c6be]'); // 성공 시 색상 변경
    } else {
      nicknameButton = false;
      errorMsgNickname.textContent = '이미 사용 중인 별명입니다.';
      errorMsgNickname.classList.add('text-[#FC3B75]');
      nicknameCheckButton.classList.remove('text-white', 'bg-[#00c6be]');
    }

    nicknameError.appendChild(errorMsgNickname);
  }

  function handleEmailCheckResult(isUnique, email) {
    const emailError = document.getElementById('emailError');
    const emailCheckButton = document.getElementById('checkEmail');
    emailError.innerHTML = ''; // 이전 에러 메시지를 제거

    const errorMsgEmail = document.createElement('p');
    if (email.length < 1) {
      errorMsgEmail.textContent = '이메일을 입력해주세요.';
      errorMsgEmail.classList.add('text-[#FC3B75]');
      emailCheckButton.classList.remove('text-white', 'bg-[#00c6be]');
    } else if (isUnique) {
      emailButton = true;
      errorMsgEmail.textContent = '사용 가능한 이메일입니다.';
      errorMsgEmail.classList.add('text-[#00c6be]');
      emailCheckButton.classList.add('text-white', 'bg-[#00c6be]'); // 성공 시 색상 변경
    } else {
      emailButton = false;

      const isValid = printEmailError(email);
      if (isValid) {
        emailError.innerHTML = '';
        errorMsgEmail.textContent = '이미 사용 중인 이메일입니다.';
        errorMsgEmail.classList.add('text-[#FC3B75]');
        emailCheckButton.classList.remove('text-white', 'bg-[#00c6be]');
      }
    }

    emailError.appendChild(errorMsgEmail);
  }

  function getFormData() {
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordCheck = document.getElementById('passwordCheck').value;

    return { nickname, email, password, passwordCheck };
  }

  function validateEmail(email) {
    if (
      !email.includes('@') ||
      (!email.endsWith('.com') && !email.endsWith('.co.kr'))
    ) {
      console.log('이메일 형식에 맞지 않습니다.');
      return false;
    }
    return true;
  }

  function validatePassword(password, passwordCheck) {
    if (password !== passwordCheck) {
      console.log('비밀번호를 확인하세요');
      return false;
    }
    if (password.length < 8) {
      console.log('비밀번호는 8자리 이상이어야 합니다.');
      return false;
    }
    return true;
  }

  function printError(email, password, passwordCheck) {
    printEmailError(email);
    printPasswordError(password, passwordCheck);
    printNicknameError();
  }

  function printEmailError(email) {
    const emailError = document.getElementById('emailError');
    emailError.innerHTML = ''; // 이전 에러 메시지를 제거

    const isValid = validateEmail(email);
    const errorMsg = document.createElement('p');
    errorMsg.textContent = isValid
      ? '사용할 수 있는 이메일입니다.'
      : '이메일 형식에 맞지 않습니다.';
    errorMsg.classList.add(isValid ? 'text-[#00c6be]' : 'text-[#FC3B75]');
    emailError.appendChild(errorMsg);

    return isValid;
  }

  function printPasswordError(password, passwordCheck) {
    const passwordError = document.getElementById('passwordError');
    passwordError.innerHTML = ''; // 이전 에러 메시지를 제거

    const isPasswordValid = validatePassword(password, passwordCheck);
    const passwordMsg = document.createElement('p');
    passwordMsg.textContent = isPasswordValid
      ? '사용할 수 있는 비밀번호입니다.'
      : '대소문자, 숫자 조합 8자 이상이어야 합니다.';
    passwordMsg.classList.add(
      isPasswordValid ? 'text-[#00c6be]' : 'text-[#FC3B75]',
    );
    passwordError.appendChild(passwordMsg);

    return isPasswordValid;
  }

  function printNicknameError() {
    const nicknameError = document.getElementById('nicknameError');
    nicknameError.innerHTML = ''; // 이전 에러 메시지를 제거

    const errorMsgNickname = document.createElement('p');
    errorMsgNickname.textContent = nicknameButton
      ? '사용 가능한 별명입니다.'
      : '이미 사용 중인 별명입니다.';
    errorMsgNickname.classList.add(
      nicknameButton ? 'text-[#00c6be]' : 'text-[#FC3B75]',
    );
    nicknameError.appendChild(errorMsgNickname);
  }
}
