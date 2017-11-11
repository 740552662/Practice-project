# 练习node.js

##1.实现一个 mysql orm 模块

```
const mysqlOrm = require('./orm');

//实例化mysql
const orm = new mysqlOrm({
  host: 'localhost',
  user: 'root',
  password: 'black',
  database: 'sys'
});

//创建一个get表的函数
let getNew_table = async () => {
  let res = await orm.table('new_table').where().skip(0).limit(12);
  try {
    console.log(res);
  } catch (e) {
    console.error(e)
  }
};

//查询
getNew_table();
```
