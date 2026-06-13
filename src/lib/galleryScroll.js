export const GALLERY_COLLAPSE_EVENT = 'gallery-collapse';

export function collapseGalleryTrack() {
  window.dispatchEvent(new CustomEvent(GALLERY_COLLAPSE_EVENT));
}
