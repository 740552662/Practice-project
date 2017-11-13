const event = require('events');
const eventEmitter = new event.EventEmitter();
class queue {
  constructor(setcount = 1) {
    this.list = [];//任务列表
    if (setcount !== 0 && typeof setcount === 'number') {
      this.count = setcount;//最高并发数
    }
    this.ps = false;//暂停
  }

  clear() {//清空任务队列
    this.list.length = 0;
    return this;
  }

  pause() {//暂停任务队列
    this.ps = true;
  }

  restore() {//恢复任务队列
    this.ps = false;
    this.run();
  }

  add(fn) {//设置任务
    this.list.push(fn);
    return this;
  }


  get() {//查询任务数
    return this.list.length;
  }

  async run() {
    if (!this.ps) {
      let p;
      if (this.list.length - this.count > 0) {//当前任务大于最高并发
        p = this.count;
      } else {
        p = this.list.length;
      }

      let k = [];
      while (p--) {
        k.push(this.list.shift()())
      }
      try {
        let msg = await Promise.all(k);
        eventEmitter.emit('success', msg);
      } catch (e) {
        eventEmitter.emit('error', e);
      }

      if (this.get() && !this.ps) {
        this.run();
      }
    }
  }
}

exports.q_event = eventEmitter;
exports.queue = queue;