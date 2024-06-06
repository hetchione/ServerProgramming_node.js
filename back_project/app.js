const express = require('express');
const app = express();
const indexRouter = require('./src/routes/index');

// JSON과 URL-encoded 형태의 요청 본문(body) 파싱 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 설정
app.use('/', indexRouter);


//DB 연동
const mysql = require('mysql2'); // express 패키지 임포트 삭제

// MariaDB 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bridgejob'
});

// 연결 테스트
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MariaDB:', err);
    return;
  }
  console.log('Connected to MariaDB!');
});

// 라우트 설정
app.get('/', (req, res) => {
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

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;