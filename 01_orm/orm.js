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

  where(q = ' ') {
    if (typeof  q === 'object') {
      this._where = ' where ';
      for (let ob in q) {
        this._where = this._where + ' and ' + ob + "='" + q[ob] + "'";
      }
    } else {
      this._where = q;
    }
    return this;
  }

  skip(s) {
    this._skip = ' limit ' + s;
    this.isLimt = true;
    return this;
  }

  limit(l) {
    if (this.isLimt) {
      this._skip = this._skip + ',' + l;
    } else {
      this._skip = this._skip + ' limit ' + l;
    }
    return this;
  }

  then(callback) {
    let pool = this.pool;//实例
    let sql = 'select * from ' + this.tablename + this._where + this._skip;//sql语句
    return new Promise(function (res, rej) {
      pool.query(sql, function (err, data) {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      })
    }).then(callback);
  }
}
module.exports = mysqlOrm;



