const express = require('express');
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
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;