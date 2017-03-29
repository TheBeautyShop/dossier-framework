function SiteScroll(element) {

  let timeout;

  const resetPointerEvents = function () {
    timeout = null;
    element.style.pointerEvents = '';
  };

  const onScroll = function () {
    element.style.pointerEvents = 'none';
    clearTimeout(timeout);
    timeout = setTimeout(resetPointerEvents, 300);
  };

  window.addEventListener('scroll', onScroll);

}

export default SiteScroll;