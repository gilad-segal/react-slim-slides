export const sliceToStart = (arr, fromIndex) => {
  return [...arr.slice(fromIndex), ...arr.slice(0, fromIndex)];
};

export const runTimes = (cb, times) =>  { // add test here
  for (let i = 0; i < times - 1; i++) {
    cb();
  }

  return cb();
}

export const deferItem = ({duration, item}) => {
  let timeoutHandler;
  let rejectHandler;
  let isResolved = false;
  const getItemValue = itemOrCallback =>
    typeof itemOrCallback === 'function' ? itemOrCallback() : itemOrCallback;

  const promise = new Promise((resolve, reject) => {
    rejectHandler = reject;
    if (duration === 0) {
      resolve(getItemValue(item));
    }
    timeoutHandler = setTimeout(() => {
      isResolved = true;
      resolve(getItemValue(item));
    }, duration);
  });

  return {
    promise,
    isResolved: () => isResolved,
    cancel: () => {
      if (isResolved) {
        throw new Error(
          'Cannot cancel deferred item that was resolved successfully'
        );
      }

      clearTimeout(timeoutHandler);
      rejectHandler('deferred item promise was cancelled');
    }
  };
};
