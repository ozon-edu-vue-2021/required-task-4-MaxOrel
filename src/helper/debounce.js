export default function debounced(f, t) {
  let debounceTimer;
  return function (args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => f(args), t); /* 500ms throttle */
  };
}
