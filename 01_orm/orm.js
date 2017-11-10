const mysql = require('mysql');

class mysqlOrm {
  constructor(obj) {
    if (typeof obj === 'object') {
      this.pool = mysql.createPool(obj);
    } else {
      throw new Error('请填入正确的参数');
    }
  }

  table(tableName) {
    this.tablename = tableName;
    return this;
  }

  find(q) {
    this.opeart = 'select * from ' + this.tablename;
    if (typeof  q === 'object') {
      this.opeart = this.opeart + ' where ';
      for (let ob in q) {
        this.opeart = this.opeart + " and " + ob + "='" + q[ob] + "'";
      }
    }
    return this;
  }

  skip(s) {
    this.opeart = this.opeart + " limit " + s;
    this.isLimt = true;
    return this;
  }

  limit(l) {
    if (this.isLimt) {
      this.opeart = this.opeart + "," + l;
    } else {
      this.opeart = this.opeart + "limit " + l;
    }
    return this;
  }

  then(callback) {
    let pool = this.pool;
    let opeart = this.opeart;
    return new Promise(function (res, rej) {
      console.log(opeart);
      pool.query(opeart, function (err, data) {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      })
    }).then(callback);
  }
}


const orm = new mysqlOrm({
  host: 'localhost',
  user: 'root',
  password: 'black',
  database: 'sys'
});

orm.table('new_table').find().skip(0).limit(12).then((res) => {
  console.log(res);
}).catch(err => {
  console.error(err)
});



