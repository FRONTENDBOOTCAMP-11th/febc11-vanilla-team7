// api.js
const BASE_URL = 'https://11.fesp.shop';
const CLIENT_ID = 'vanilla07';

// 기본 fetch 함수
async function fetchData(url, method, data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'client-id': CLIENT_ID,
    },
  };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  return response.json();
}

// 회원가입 요청
export function registerUser(userData) {
  return fetchData('/users', 'POST', userData);
}

// 닉네임 중복 확인 요청
export function checkNameDuplicate(nickname) {
  return fetchData(`/users/name?name=${nickname}`, 'GET');
}

// 이메일 중복 확인 요청
export function checkEmailDuplicate(email) {
  return fetchData(`/users/email?email=${email}`, 'GET');
}

// 로그인 요청
export function loginUser(userData) {
  return fetchData('/users/login', 'POST', userData);
}
// 브런치 데이터 가져오기
export function brunchData() {
  return fetchData('/posts?type=brunch&sort={"views":-1}', 'GET');
}

// 작가 데이터 가져오기
export function writerData() {
  return fetchData(
    '/users?sort={"bookmarkedBy.users": -1, "createdAt": 1}&limit=4',
    'GET',
  );
}

// 인증이 필요한 API 요청을 위한 fetchWithAuth 함수
async function fetchWithAuth(url, method, data = null) {
  const token = sessionStorage.getItem('accessToken');
  const options = {
      method,
      headers: {
          'Content-Type': 'application/json',
          'client-id': CLIENT_ID,
          'Authorization': `Bearer ${token}`
      },
  };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${BASE_URL}${url}`, options);
  if (response.status === 401) {
      sessionStorage.removeItem('accessToken');
      window.location.href = '/login';
      return;
  }
  return response.json();
}

// 특정 포스트 정보 가져오기
export function getPostById(postId) {
  return fetchWithAuth(`/posts/${postId}`, 'GET');
}

// 최근 본 포스트 가져오기
export function getRecentPosts() {
  return fetchWithAuth('/posts/recent', 'GET');
}

