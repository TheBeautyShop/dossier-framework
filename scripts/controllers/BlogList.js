import { Tweak, ImageLoader } from '@squarespace/core';
import { resizeEnd, scroll } from '../utils';

const loadEvent = new CustomEvent('template:blogList.load');


function BlogList(element) {

  // Get elements from DOM
  const blogListInner = element.querySelector('.BlogList-inner');
  const loadMoreButton = element.querySelector('.BlogList-load');

  // Load next boolean, used by load function
  let loadNext;

  // Infinite scroll value
  const infiniteScroll = Tweak.getValue('tweak-blog-list-load') === 'Infinite Scroll';

  let edge;


  // ---------------------------------


  const sync = function () {


    const items = Array.prototype.slice.call(blogListInner.querySelectorAll('.BlogList-item'));

    items.forEach(function (item) {

      const image = item.querySelector('.Blog-header-image img');

      if (image) {
        ImageLoader.load(image, {
          load: true,
          mode: 'fill'
        });
      }

    });

    // Sync last page data
    if (blogListInner.querySelector('[data-last-page]')) {
      loadNext = false;
      element.setAttribute('data-last-page-reached', '');
    } else {
      loadNext = true;
    }

    // Sync load edge for infinite scroll
    if (infiniteScroll) {
      edge = blogListInner.getBoundingClientRect().bottom + window.pageYOffset;
    }

  };


  // --------------------------------


  const load = function () {

    if (!loadNext) { return false; }

    // Set loadNext to false so simultaneous loads don't happen
    loadNext = false;

    // Get offset from last blog list item on page
    const blogListItems = blogListInner.querySelectorAll('.BlogList-item');
    const offset = blogListItems[blogListItems.length - 1].getAttribute('data-offset');

    // Construct URL for request
    const url = [
      window.location.pathname,
      window.location.search,
      window.location.search ? '&' : '?',
      'offset=',
      offset,
      '&format=main-content'
    ].join('');

    // Request
    const request = new XMLHttpRequest();
    request.onreadystatechange = function (e) {

      if (e.target.readyState !== XMLHttpRequest.DONE || e.target.status !== 200) {
        return;
      }

      try {

        // Insert html
        blogListInner.insertAdjacentHTML('beforeend', e.target.responseText);

        // Sync
        sync();

        // Add to mercury cache
        window.dispatchEvent(loadEvent);

        // Allow loads again if not last page
        if (!blogListInner.querySelector('[data-last-page]')) {
          loadNext = true;
        }

      } catch (err) {

        console.error('ERROR:', err);

      }

    };
    request.open('GET', url, true);
    request.send();

  };


  // ---------------------------------

  const loadMoreClick = function (e) {
    e.preventDefault();
    load();
  };


  // ---------------------------------


  const bindListeners = function () {

    Tweak.watch(sync);

    scroll(function() {
      if (infiniteScroll && window.pageYOffset + window.innerHeight * 2 > edge) {
        load();
      }
    });

    resizeEnd(sync);

    loadMoreButton.addEventListener('click', loadMoreClick);

  };


  // --------------------------------


  const destroy = function () {

    // NOTE:
    // Functionality that is bound using the Template.Util convenience methods
    // resizeEnd and scroll are automatically unbound on mercury:unload and
    // rebound on mercury:load.

    // Load on click of load more button
    loadMoreButton.removeEventListener('click', loadMoreButton);

  };


  // ---------------------------------

  // Init

  bindListeners();
  sync();


  return {

    sync: sync,
    destroy: destroy

  };


}


export default BlogList;
