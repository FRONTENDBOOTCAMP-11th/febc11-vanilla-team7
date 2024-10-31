import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: 'index.html', // 기본 index.html
        home: 'src/views/home.html',
        header: 'src/components/header.html',
        footer: 'src/components/footer.html',
        login: 'src/views/login.html',
        mybox: 'src/views/myBox.html',
        post: 'src/views/post.html',
        search: 'src/views/search.html',
        signup: 'src/views/signup.html',
        upload: 'src/views/upload.html',
        write: 'src/views/write.html',
        writerHome: 'src/views/writerHome.html',

        // login: resolve(__dirname, 'src/pages/auth/login.html'), // 추가 HTML 파일
        // list: resolve(__dirname, 'src/pages/board/list.html'), // 추가 HTML 파일
        // 필요한 다른 HTML 파일을 여기에 추가
      },
    },
  },
});
