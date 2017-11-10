# 练习node.js

##1.实现一个 mysql orm 模块

```
//初始化mysql
const orm = new mysqlOrm({
  host: 'localhost',
  user: 'root',
  password: 'black',
  database: 'sys'
});

//表查询
orm.table('new_table').find().skip(0).limit(12).then((res) => {
  console.log(res);
}).catch(err => {
  console.error(err)
});
```
