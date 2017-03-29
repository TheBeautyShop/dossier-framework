
/**
 * TemplateUtils has some useful utility methods,
 * like a resize end handler.
 */

export const scroll = (fn) => {
  window.addEventListener('scroll', fn);
  window.addEventListener('mercury:unload', () => {
    window.removeEventListener('scroll', fn);
  });
};

export const resizeEnd = (fn) => {

  const RESIZE_TIMEOUT = 100;
  let _resizeMeasureTimer;

  const resize = function () {
    clearTimeout(_resizeMeasureTimer);
    _resizeMeasureTimer = setTimeout(() => {
      fn();
    }, RESIZE_TIMEOUT);
  };

  window.addEventListener('resize', resize);

  window.addEventListener('mercury:unload', () => {
    window.removeEventListener('resize', resize);
  });

};