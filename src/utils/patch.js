const debounce = (callback, delay) => {
  let tid = null;
  return function () {
      const ctx = self
      tid && clearTimeout(tid);
      tid = setTimeout(() => {
          callback.apply(ctx, arguments)
      }, delay)
  }
}

export default () => {
  const _ = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ {
      constructor(callback) {
          callback = debounce(callback, 20)
          super(callback);
      }
  }
}