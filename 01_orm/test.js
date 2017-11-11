const mysqlOrm = require('./orm');

const orm = new mysqlOrm({
  host: 'localhost',
  user: 'root',
  password: 'black',
  database: 'sys'
});

let getNew_table = async () => {
  let res = await orm.table('new_table').where().skip(0).limit(12);
  try {
    console.log(res);
  } catch (e) {
    console.error(e)
  }
};

getNew_table();