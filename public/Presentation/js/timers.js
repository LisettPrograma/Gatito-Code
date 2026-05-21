let timerIds = [];

export function schedule(callback, delay) {
  const id = setTimeout(() => {
    // Clean ourselves up before running the callback
    const idx = timerIds.indexOf(id);
    if (idx !== -1) timerIds.splice(idx, 1);
    callback();
  }, delay);
  timerIds.push(id);
  return id;
}

export function clearAllTimers() {
  for (const id of timerIds) {
    clearTimeout(id);
  }
  timerIds.length = 0;
}
