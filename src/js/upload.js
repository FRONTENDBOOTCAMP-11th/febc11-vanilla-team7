import { uploadImage } from './api.js';

export function upload() {
    const MAX_IMAGES = 10;
    const state = { count: 0 };
    
    const elements = {
        boxes: document.querySelectorAll('.upload-box'),
        counter: document.getElementById('current-count'),
        done: document.getElementById('done'),
        exit: document.getElementById('exit')
    };

    const handlers = {
        async handleUpload(box, file) {
            if (state.count >= MAX_IMAGES) {
                alert(`최대 ${MAX_IMAGES}개까지만 선택할 수 있습니다.`);
                return;
            }

            try {
                // 미리보기 생성
                const preview = document.createElement('img');
                preview.src = URL.createObjectURL(file);
                preview.className = 'absolute inset-0 w-full h-full object-cover';

                const checkIcon = document.createElement('img');
                checkIcon.src = 'src/assets/icons/done-upload.svg';
                checkIcon.className = 'absolute top-2 right-2 w-[18px] h-[18px] z-10';

                box.append(preview, checkIcon);
                state.count++;

                // 업로드 처리
                const response = await uploadImage(file);
                if (response.item) {
                    localStorage.setItem('uploadedImage', response.item);
                }

                // UI 업데이트
                elements.counter.textContent = state.count;
                elements.done.querySelector('img').src = 
                    `src/assets/icons/done-${state.count > 0 ? 'on' : 'off'}.svg`;
            } catch (error) {
                console.error('업로드 실패:', error);
                box.innerHTML = '';
                state.count--;
                alert('이미지 업로드에 실패했습니다.');
            }
        }
    };

    // 초기화
    function initialize() {
        elements.boxes.forEach(box => {
            box.onclick = () => {
                if (!box.querySelector('img')) {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = e => {
                        const file = e.target.files?.[0];
                        if (file) handlers.handleUpload(box, file);
                    };
                    input.click();
                }
            };
        });

        elements.done.onclick = () => {
            state.count > 0 ? window.navigate('write') : alert('이미지를 선택해주세요.');
        };

        elements.exit.onclick = () => window.navigate('home');
    }

    initialize();
}
