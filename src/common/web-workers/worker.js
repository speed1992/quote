export let worker;
if (typeof window !== "undefined") {
  if (window.Worker) {
    worker = new Worker(new URL("./filter-worker.js", import.meta.url));
  } else {
    alert("Your browser doesn't support web workers.");
  }
}
