// 创建一个空对象模拟 navigator
let customNavigator = {
  userAgent: '11111111111111111',
  platform: 'Custom Platform',
  language: 'en-US',
};

// 替换全局的 navigator 为自定义对象
Object.defineProperty(window, 'navigator', {
  value: new Proxy(customNavigator, {
    get: (target, prop, receiver) => {
      console.table([{
        method: 'get',
        target: target,
        property: prop,
        receiver: receiver,
        value: Reflect.get(target, prop, receiver)
      }]);
      return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
      console.table([{
        method: 'set',
        target: target,
        property: prop,
        value: value,
        receiver: receiver
      }]);
      return Reflect.set(target, prop, value, receiver);
    }
  }),
  configurable: true,
  writable: true,
});

// 测试代理
console.log(navigator.userAgent); // 输出代理日志并返回值
console.log()