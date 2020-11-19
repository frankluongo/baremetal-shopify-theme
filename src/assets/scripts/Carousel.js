const ACTIVE = 'data-active';

export default function Carousel() {
  const root = document.documentElement;
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;
  const panels = carousel.querySelectorAll('[data-panel]');
  const controls = carousel.querySelectorAll('[data-control]');
  const dots = carousel.querySelectorAll('[data-dot]');
  const panelImage = carousel.querySelector('[data-panel-image]');
  if (!panels.length > 0 || !controls.length > 0 || !dots.length > 0) return;
  const limit = panels.length - 1;
  const state = { index: 0, panelHeight: panelImage.getBoundingClientRect().height };
  const speed = parseInt(carousel.dataset.carouselSpeed) * 1000;
  if (speed > 0) window.carouselInterval = setInterval(onInterval, speed);
  getAndSetPanelHeight();

  controls.forEach(ctrl => ctrl.addEventListener('click', onCtrlClick));
  dots.forEach(dot => dot.addEventListener('click', onDotClick))
  window.addEventListener('resize', onWndwResize);


  function onDotClick(e) {
    const { controlsPanel } = e.currentTarget.dataset;
    state.index = parseInt(controlsPanel);
    setNext();
  }

  function onCtrlClick(e) {
    const { direction } = e.currentTarget.dataset;
    const nextItem = direction === 'next' ? 1 : -1;
    state.index = checkBounds(state.index + nextItem);
    setNext();
  }

  function onInterval() {
    state.index = checkBounds(state.index + 1);
    setNext();
  }

  function onWndwResize() {
    if (state.panelHeight !== panelImage.getBoundingClientRect().height) getAndSetPanelHeight();
  }

  // Actions
  function getAndSetPanelHeight() {
    const { height } = panelImage.getBoundingClientRect()
    state.panelHeight = height;
    root.style.setProperty('--carousel-panel-height', `${height}px`);
  }

  function setNext() {
    clearInterval(window.carouselInterval)
    resetItems();
    panels[state.index].setAttribute(ACTIVE, true);
    dots[state.index].setAttribute(ACTIVE, true);
  }

  function resetItems() {
    panels.forEach(panel => panel.setAttribute(ACTIVE, false))
    dots.forEach(dot => dot.setAttribute(ACTIVE, false))
  }

  // Helpers
  function checkBounds(number) {
    if (number < 0) return limit;
    if (number > limit) return 0;
    return number;
  }
}
