import { register } from '@squarespace/controller';
import '@squarespace/polyfills/Element/matches';
import './polyfills';

// Controllers
import AncillaryLayout from './controllers/AncillaryLayout';
import BlogItemPaginationArrows from './controllers/BlogItemPaginationArrows';
import BlogList from './controllers/BlogList';
import MobileOffset from './controllers/MobileOffset';
import MobileOverlayFolders from './controllers/MobileOverlayFolders';
import MobileOverlayToggle from './controllers/MobileOverlayToggle';
import SimpleImageLoad from './controllers/SimpleImageLoad';
import SiteLoader from './controllers/SiteLoader';
import SiteScroll from './controllers/SiteScroll';

// Bind controllers
register('AncillaryLayout', AncillaryLayout);
register('BlogItemPaginationArrows', BlogItemPaginationArrows);
register('BlogList', BlogList);
register('MobileOffset', MobileOffset);
register('MobileOverlayFolders', MobileOverlayFolders);
register('MobileOverlayToggle', MobileOverlayToggle);
register('SimpleImageLoad', SimpleImageLoad);
register('SiteLoader', SiteLoader);
register('SiteScroll', SiteScroll);