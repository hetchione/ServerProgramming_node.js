const express = require('express');
const path = require('path');

const app = express();

// 정적 파일을 제공하는 미들웨어 설정
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});
app.get('/signUp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/signUp.html'));
});
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/main.html'));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
