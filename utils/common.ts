// 搜索节流
function throttled(fn: (...args: any[]) => void, delay: number) {
    // console.log("触发");
    let timer: ReturnType<typeof setTimeout> | null = null;
    let starttime = Date.now();

    return function (this: any, ...args: any[]) {
        let curTime = Date.now(); // 当前时间
        let remaining = delay - (curTime - starttime); // 从上一次到现在，还剩下多少多余时间
        let context = this;

        clearTimeout(timer as ReturnType<typeof setTimeout>);

        if (remaining <= 0) {
            fn.apply(context, args);
            starttime = Date.now();
        } else {
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, remaining);
        }
    };
}
// 防抖
function debounce(fn: (...args: any[]) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return function (this: any, ...args: any[]) {
        let context = this;
        clearTimeout(timer as ReturnType<typeof setTimeout>);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}
export { throttled,debounce };