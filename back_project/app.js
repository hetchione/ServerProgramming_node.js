const express = require('express');
const path = require('path');
const app = express();
const connection = require('./db').connection;
const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/loginRoutes');

// JSON과 URL-encoded 형태의 요청 본문(body) 파싱 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 설정
app.use('/', indexRouter);
app.use('/login', loginRouter);

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

// BackEnd 브랜치의 라우트 설정 (경로를 /data로 변경하여 충돌을 피함)
app.get('/data', (req, res) => {
  // 예시 쿼리 실행
  connection.query('SELECT * FROM your_table', (err, results, fields) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Error retrieving data from database');
    }
    // 쿼리 결과 출력
    res.send(results);
  });
});

// 서버 실행 (main 브랜치의 포트를 사용)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
