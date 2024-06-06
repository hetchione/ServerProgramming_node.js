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

module.exports = { connection };