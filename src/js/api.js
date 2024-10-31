// api.js
const BASE_URL = 'https://11.fesp.shop';
const CLIENT_ID = 'vanilla07';

// 기본 fetch 함수
async function fetchData(url, method, data = null) {
  const token = sessionStorage.getItem('accessToken');
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'client-id': CLIENT_ID,
      'Authorization': token ? `Bearer ${token}` : ''
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

//내 브런치에 사용할 데이터 가져오기
export function getMyBrunchData() {
  return fetchData('/posts?type=brunch', 'GET');
}

// 작가 데이터 가져오기
export function writerData() {
  return fetchData(
    '/users?sort={"bookmarkedBy.users": -1, "createdAt": 1}&limit=4',
    'GET',
  );
}


// 검색 데이터 가져오기
export function searchData(endpoint) {
  return fetchData(endpoint, 'GET');
}

// 특정 포스트 정보 가져오기
export function getPostById(postId) {
  return fetchData(`/posts/${postId}`, 'GET');
}

// 최근 본 포스트 가져오기
export function getRecentPosts() {
  return fetchData('/posts/recent', 'GET');
}

//북마크 데이터 가져오기
export function getBookmarkedPosts() {
  return fetchData('/bookmarks/post', 'GET');
}

//관심 작가 데이터 가져오기
export function getSubscribedWriters() {
  const userId = sessionStorage.getItem('id'); // 현재 로그인한 사용자의 ID
  return fetchData(`/users?sort={"bookmarkedBy.users":-1}&filter={"bookmarkedBy.users":${userId}}&limit=4`, 'GET');
}

// 글쓰기 데이터 업로드
export function postBrunchData(data) {
  return fetchData('/posts', 'POST', {
      type: 'brunch',
      title: data.title,
      subTitle: data.subtitle,
      content: data.content,
      // image: data.image, 안됨..
      user: {
          _id: parseInt(data.user._id),
          name: data.user.name
      }
  });
}

// 파일 업로드
export async function uploadImage(file) {
  const token = sessionStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('attach', file);

  const response = await fetch(`${BASE_URL}/files`, {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${token}`,
          'client-id': CLIENT_ID,
      },
      body: formData
  });

  if (!response.ok) throw new Error('이미지 업로드 실패');
  
  const data = await response.json();
  return data;
}