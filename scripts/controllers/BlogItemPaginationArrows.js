import { authenticated, mobileBreakpoint } from '../constants';
import { Tweak } from '@squarespace/core';

const loadedClassname = 'BlogItem-pagination--loaded';
const overlayClassname = 'BlogItem-pagination--overlay';
const tweakingClassname = 'BlogItem-pagination-link--tweaking';

function BlogItemPaginationArrows(element) {

  let range = {
    top: -1,
    bottom: -1
  };
  const blogItemHeader = document.body.querySelector('.Blog-header');

  let siteBorderShow;
  let blogItemPaginationOption;
  let borderWidth = 0;

  const paginationLinkPrev = element.querySelector('.BlogItem-pagination-link--prev');
  const paginationLinkNext = element.querySelector('.BlogItem-pagination-link--next');

  const arrowIconStyle = window.getComputedStyle(element.querySelector('.BlogItem-pagination-icon'));
  const arrowWidth = parseFloat(arrowIconStyle.paddingLeft) + parseFloat(arrowIconStyle.width);
  const arrowPosition = window.innerHeight / 2;

  // ---------------------------------

  const overlapsBorder = function () {
    // Stop if border is wider than where icon appears.
    return siteBorderShow && borderWidth >= arrowWidth;
  };

  // ---------------------------------


  const onKeydown = function (e) {

    const isLightboxOpen = document.body.classList.contains('sqs-lightbox-open');
    if (blogItemPaginationOption !== 'Floating' || authenticated || isLightboxOpen) {
      return false;
    }

    if (e.keyCode === 37 && paginationLinkPrev) {
      e.preventDefault();
      paginationLinkPrev.click();
    } else if (e.keyCode === 39 && paginationLinkNext) {
      e.preventDefault();
      paginationLinkNext.click();
    }

  };


  // ---------------------------------


  const onScroll = function () {

    if (blogItemPaginationOption !== 'Floating') { return false; }
    if (overlapsBorder()) { return false; }

    const inRange = window.pageYOffset > range.top - arrowPosition && window.pageYOffset < range.bottom - arrowPosition;

    element.classList.toggle(overlayClassname, inRange);

  };


  // ---------------------------------


  const sync = function () {

    // Get pagination option
    blogItemPaginationOption = Tweak.getValue('tweak-blog-item-pagination');
    if (blogItemPaginationOption !== 'Floating') { return false; }

    // Sync border
    siteBorderShow = Tweak.getValue('tweak-site-border-show') === 'true';
    borderWidth = parseFloat(Tweak.getValue('tweak-site-border-width'));
    if (overlapsBorder()) {
      element.classList.add(loadedClassname);
      return false;
    }

    // Sync header
    const blogItemHeaderOption = Tweak.getValue('tweak-blog-item-header');

    let rect;

    if (blogItemHeaderOption === 'Full Bleed') {
      range = {
        top: 0,
        bottom: window.innerHeight
      };
    } else if (blogItemHeaderOption === 'Full Width Banner') {
      rect = blogItemHeader.getBoundingClientRect();
      range = {
        top: rect.top + window.pageYOffset,
        bottom: rect.bottom + window.pageYOffset
      };
    }

    onScroll();

    element.classList.add(loadedClassname);

  };



  // ---------------------------------

  // Init & bind

  sync();
  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', sync);
  window.addEventListener('keydown', onKeydown);

  // Tweak list for sync
  const syncTweaks = [
    'tweak-site-border-show',
    'tweak-site-border-width',
    'tweak-blog-item-pagination'
  ];
  Tweak.watch(syncTweaks, sync);

  // Tweak list to show
  const tweakingTweaks = [
    'tweak-blog-item-pagination',
    'tweak-blog-item-pagination-title-font',
    'tweak-blog-item-pagination-title-font-font-family',
    'tweak-blog-item-pagination-title-font-font-weight',
    'tweak-blog-item-pagination-title-font-font-style',
    'tweak-blog-item-pagination-title-font-font-size',
    'tweak-blog-item-pagination-title-font-text-transform',
    'tweak-blog-item-pagination-title-font-letter-spacing',
    'tweak-blog-item-pagination-title-color',
    'tweak-blog-item-pagination-meta',
    'tweak-blog-item-pagination-meta-font',
    'tweak-blog-item-pagination-meta-font-font-family',
    'tweak-blog-item-pagination-meta-font-font-weight',
    'tweak-blog-item-pagination-meta-font-font-style',
    'tweak-blog-item-pagination-meta-font-font-size',
    'tweak-blog-item-pagination-meta-font-text-transform',
    'tweak-blog-item-pagination-meta-font-letter-spacing',
    'tweak-blog-item-pagination-meta-color'
  ];

  const toggleTweakingClass = function(tweak) {

    const isTweaking = window.innerWidth > mobileBreakpoint &&
                     tweak.name &&
                     tweakingTweaks.indexOf(tweak.name) >= 0;

    const paginationLink = paginationLinkPrev || paginationLinkNext;

    if (paginationLink) {
      paginationLink.classList.toggle(tweakingClassname, isTweaking);
    }

  };
  Tweak.watch(toggleTweakingClass);




  // ---------------------------------



  return {

    destroy: function () {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', sync);
      window.removeEventListener('keydown', onKeydown);
    }

  };

}



export default BlogItemPaginationArrows;
