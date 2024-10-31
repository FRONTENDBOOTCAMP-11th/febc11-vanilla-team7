import { postBrunchData } from './api.js';

export function write() {
    // 설정
    const alignStates = {
        left: { next: 'center', imgSrc: 'align-left' },
        center: { next: 'right', imgSrc: 'align-center' },
        right: { next: 'left', imgSrc: 'align-right' }
    };

    // DOM 요소
    const elements = {
        align: document.getElementById('align'),
        title: document.getElementById('title'),
        subtitle: document.getElementById('subtitle'),
        content: document.getElementById('contents'),
        keyboard: document.getElementById('keyboard'),
        submit: document.getElementById('done'),
        exit: document.getElementById('exit')
    };

    // 상태
    let currentAlign = 'left';

    // 이벤트 핸들러
    const handlers = {
        updateAlignment() {
            const next = alignStates[currentAlign];
            currentAlign = next.next;
            
            elements.align.querySelector('img').src = `src/assets/icons/${next.imgSrc}.svg`;
            ['title', 'subtitle', 'content'].forEach(field => {
                elements[field].className = `text-${currentAlign}`;
            });
        },

        async saveBrunch() {
            const isEmpty = ['title', 'subtitle', 'content'].some(
                field => !elements[field].value.trim()
            );

            if (isEmpty) {
                alert('빈칸이 있습니다. 내용을 입력해주세요.');
                return;
            }

            try {
                await postBrunchData({
                    type: 'brunch',
                    title: elements.title.value,
                    subtitle: elements.subtitle.value,
                    content: elements.content.value,
                    image: localStorage.getItem('uploadedImage'),
                    user: {
                        _id: sessionStorage.getItem('id'),
                        name: sessionStorage.getItem('name')
                    }
                });

                localStorage.removeItem('uploadedImage');
                alert('저장되었습니다.');
                window.navigate('home');
            } catch (error) {
                console.error('저장 실패:', error);
                alert('저장에 실패했습니다.');
            }
        },

        updateKeyboardIcon() {
            const isValid = ['title', 'subtitle', 'content'].every(
                field => elements[field].value.trim()
            );
            elements.keyboard.querySelector('img').src = 
                `src/assets/icons/keyboard-${isValid ? 'on' : 'hide'}.svg`;
        }
    };

    // 초기화
    function initialize() {
        elements.exit.onclick = () => window.navigate('home');
        elements.align.onclick = handlers.updateAlignment;
        elements.submit.onclick = handlers.saveBrunch;
        
        ['title', 'subtitle', 'content'].forEach(field => {
            elements[field].oninput = handlers.updateKeyboardIcon;
        });

        handlers.updateKeyboardIcon();
    }

    initialize();
}