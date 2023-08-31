export let worker
if (window.Worker) {
    worker = new Worker(new URL('./filter-worker.js', 'file:///C:/Users/paras/Desktop/quotes/src/common/web-workers/meta-url.js'))
} else {
    // alert("Your browser doesn't support web workers.")
}
