export function retry(fn, n) {
    let promise = Promise.reject();
    for (let i = 0; i < n; i++) {
        promise = promise.catch(() => fn());
    }
    promise.catch(() => {
        throw new Error(`Failed retrying ${n} times`);
    });
    return promise;
}

export const retryTenTimes = fn => retry(fn, 10);

export function retryWithAlternativeEndpoint(fn, n) {
    let promise = Promise.reject();
    for (let i = 0; i < n; i++) {
        promise = promise.catch(() => fn());
    }
    promise.catch(() => {
        throw new Error(`Failed retrying ${n} times`);
    });
    return promise;
}