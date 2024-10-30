export function upload() {
    // DOM 요소 선택
    const uploadBoxes = document.querySelectorAll('.upload-box');
    const currentCount = document.getElementById('current-count');
    const doneButton = document.getElementById('done');
    let selectedCount = 0;

    // 이미지 카운터 업데이트
    function updateCounter() {
        currentCount.textContent = selectedCount;
        doneButton.querySelector('img').src = selectedCount > 0 
            ? 'src/assets/icons/done-on.svg' 
            : 'src/assets/icons/done-off.svg';
    }

    // 파일 선택 처리
    function handleFileSelect(box, file) {
        if (selectedCount >= 10) {
            alert('최대 10개까지만 선택할 수 있습니다.');
            return;
        }

        // 로컬 미리보기 생성
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = function() {
            // 미리보기 이미지 생성
            const previewImg = document.createElement('img');
            previewImg.src = reader.result;
            previewImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;';
            
            // 체크 아이콘 생성
            const checkIcon = document.createElement('img');
            checkIcon.src = 'src/assets/icons/done-upload.svg';
            checkIcon.style.cssText = 'position: absolute; top: 8px; right: 8px; width: 18px; height: 18px; z-index: 10;';

            // 박스에 이미지들 추가
            box.appendChild(previewImg);
            box.appendChild(checkIcon);
            
            // 카운터 업데이트
            selectedCount++;
            updateCounter();

            // 서버에 업로드
            const formData = new FormData();
            formData.append('attach', file);

            fetch('https://11.fesp.shop/files', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'client-id': 'vanilla07'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
                uploadedFiles.push({
                    name: file.name,
                    url: data.url,
                    uploadDate: new Date().toISOString()
                });
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
            })
            .catch(error => {
                console.error('업로드 실패:', error);
                box.removeChild(previewImg);
                box.removeChild(checkIcon);
                selectedCount--;
                updateCounter();
                alert('이미지 업로드에 실패했습니다.');
            });
        };
    }

    // 업로드 박스 클릭 이벤트
    uploadBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.querySelector('img')) return;

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = e => {
                if (e.target.files?.[0]) {
                    handleFileSelect(box, e.target.files[0]);
                }
            };
            input.click();
        });
    });

    // 완료 버튼 클릭 이벤트
    doneButton.addEventListener('click', () => {
        if (selectedCount > 0) {
            window.location.href = 'write.html';
        } else {
            alert('이미지를 선택해주세요.');
        }
    });

    // 초기 상태 설정
    updateCounter();
}

//토큰 값 나중에 지우기
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInR5cGUiOiJhZG1pbiIsIm5hbWUiOiLrrLTsp4AiLCJlbWFpbCI6ImFkbWluQGZlc3Auc2hvcCIsImltYWdlIjoiL2ZpbGVzL3ZhbmlsbGEwNy91c2VyLW11emkud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzI5NjY2MzcyLCJleHAiOjE3Mjk3NTI3NzIsImlzcyI6IkZFU1AifQ.6aVH5caA1jBit60e7R0cmhlTEyBHJzfRITvOaeYtcy8';

// 페이지 로드 시 초기화
// document.addEventListener('DOMContentLoaded', initializePage);