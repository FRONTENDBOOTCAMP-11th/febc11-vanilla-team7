import {
  registerUser,
  checkNameDuplicate,
  checkEmailDuplicate,
} from '/src/js/api.js';

export function signup() {
  console.log('signup');

  let nicknameButton = false;
  let emailButton = false; // 이메일 중복 체크 버튼 상태 추가

  register();

  function register() {
    const registerButton = document.getElementById('register');
    const nicknameCheckButton = document.getElementById('checkNickname');
    const emailCheckButton = document.getElementById('checkEmail'); // 이메일 중복 체크 버튼

    nicknameCheckButton.addEventListener('click', async e => {
      e.preventDefault();
      const nickname = document.getElementById('nickname').value;
      const isUnique = await checkNickname(nickname);
      handleNicknameCheckResult(isUnique, nickname);
    });

    emailCheckButton.addEventListener('click', async e => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const isUnique = await checkEmail(email);
      handleEmailCheckResult(isUnique, email);
    });

    registerButton.addEventListener('click', async e => {
      e.preventDefault();
      const { nickname, email, password, passwordCheck } = getFormData();

      if (!nicknameButton || !emailButton) {
        alert('닉네임 및 이메일 중복 확인을 먼저 해주세요.');
        return;
      }

      printError(email, password, passwordCheck);

      const userData = {
        name: nickname,
        email,
        password,
        type: 'user',
      };

      await registerUser(userData);
    });
  }

  async function checkNickname(nickname) {
    try {
      const data = await checkNameDuplicate(nickname);
      return data.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function checkEmail(email) {
    try {
      const data = await checkEmailDuplicate(email);
      return data.ok;
    } catch (error) {
      console.error(error);
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

      nicknameCheckButton.classList.add('text-white', 'bg-[#00c6be]'); // 성공시 색상 변경
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

      emailCheckButton.classList.add('text-white', 'bg-[#00c6be]'); // 성공시 색상 변경
    } else {
      emailButton = false;

      const isValid = printEmailError(email);
      if (!isValid) {
        emailError.innerHTML = errorMsgEmail.textContent =
          '이미 사용 중인 이메일입니다.';
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
