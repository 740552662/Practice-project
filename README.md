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
##2.实现一个 异步队列 模块
```
const queue = require('./queue').queue;
const q_event = require('./queue').q_event;

let s_time = new Date().getTime();
let q = new queue(1);//设置并发为2


let f1 = () => { //模拟异步函数1
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(1)
    }, 2000)
  });
};


let f2 = () => { //模拟异步函数2
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(2)
    }, 2000)
  });
};

q_event.on('success', function (res) {//监听成功事件
  console.log(new Date().getTime() - s_time, res);
});

q_event.on('error', function (e) {//监听失败事件
  console.log(e);
});

q.add(f1).add(f2).run();//添加2个函数，并运行


```

```
//打印输出
2005 [ 1 ]
4015 [ 2 ]

```
##3.实现一个 redis session 中间件模块