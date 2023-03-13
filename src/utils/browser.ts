/*
 * 添加事件
 * target: 组件
 * type: 事件类型-前头不带'on'
 * func: 函数-函数名或者整个匿名函数
 */
export function addEvent(
    target: Window | Document | HTMLElement,
    type: string,
    func: any,
    useCapture = false
) {
    if (target.addEventListener) {
        target.addEventListener(type, func, useCapture);
    } else if (target.attachEvent) {
        target.attachEvent("on" + type, func);
    }
}

export function removeEvent(
    target: Window | Document | HTMLElement,
    type: string,
    func: any
) {
    if (target.removeEventListener) {
        target.removeEventListener(type, func, false);
    } else if (target.detachEvent) {
        target.detachEvent("on" + type, func);
    }
}
