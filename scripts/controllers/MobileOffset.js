import { Tweak } from '@squarespace/core';
import { mobileBreakpoint } from '../constants';
import { resizeEnd } from '../utils';

function MobileOffset(element) {

  const sync = function() {

    if (window.innerWidth < mobileBreakpoint) {

      let offset = 0;
      const elementStyles = window.getComputedStyle(element);

      if (elementStyles.display !== 'none' && elementStyles.position === 'fixed') {
        offset = element.offsetHeight;
      }

      if (parseFloat(elementStyles.bottom) === 0) {
        // Bottom bar
        document.body.style.marginBottom = offset + 'px';

        const mobileInfoBar = document.querySelector('.sqs-mobile-info-bar');

        if (mobileInfoBar) {
          mobileInfoBar.style.bottom = offset + 'px';
        }

      } else {
        // Top bar
        document.body.style.marginTop = offset + 'px';
      }

    } else {
      document.body.style.marginTop = '';
      document.body.style.marginBottom = '';
    }

  };

  // Sync on tweak change
  const tweaks = [
    'tweak-mobile-bar-branding-position',
    'tweak-mobile-bar-menu-icon-position',
    'tweak-mobile-bar-cart-position',
    'tweak-mobile-bar-search-icon-position',
    'tweak-mobile-bar-top-fixed'
  ];
  Tweak.watch(tweaks, sync);

  resizeEnd(sync);

  sync();


  return {
    sync
  };

}


export default MobileOffset;