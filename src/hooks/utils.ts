export default () => {

  const debounce = () => {
    let timeout: any;
    return function (fnc, delayMs) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fnc();
      }, delayMs || 500);
    };
  }

  return {
    debounce
  }
}