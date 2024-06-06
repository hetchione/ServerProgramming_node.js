const connection = require('../../db').connection;


exports.login = (req, res) => {
    const { id, passwd } = req.body;

    // 사용자 검증 로직
    connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results, fields) => {
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).send('Error retrieving data from database');
        }

        if (results.length > 0) {
            // 사용자가 존재할 경우
            const user = results[0];
            if (user.passwd === passwd) {
                // 비밀번호가 일치하는 경우
                res.status(200).json({ message: '로그인 성공' });
            } else {
                // 비밀번호가 일치하지 않는 경우
                res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
            }
        } else {
            // 사용자가 존재하지 않는 경우
            res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    });
};