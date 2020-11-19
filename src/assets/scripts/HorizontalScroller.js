export default function HorizontalScrollers() {
  const scrollers = document.querySelectorAll('[data-horizontal-scroller]');
  if (!scrollers || scrollers.length < 1) return;
  scrollers.forEach(HorizontalScroller)
}

function HorizontalScroller(scroller) {
  const controls = scroller.querySelectorAll('[data-hs-ctrl]');
  const outer = scroller.querySelector('[data-hs-outer]');
  const inner = scroller.querySelector('[data-hs-inner]');
  const state = { dimensions: getDimensions() };

  checkDimensions();

  window.addEventListener('resize', onResize);
  window.addEventListener('load', onResize);
  controls.forEach(ctrl => ctrl.addEventListener('click', onCtrlClick))

  function onCtrlClick(e) {
    const { direction } = e.currentTarget.dataset;
    const increment = getIncrement(direction);
    inner.scrollLeft += increment;
  }

  function onResize() {
    state.dimensions = getDimensions();
    checkDimensions();
  }

  function checkDimensions() {
    const { inner, outer } = state.dimensions;
    setOuterWidth(outer.width);
    if (inner.scrollWidth <= outer.scrollWidth) hideCtrls();
    if (inner.scrollWidth > outer.scrollWidth) showCtrls();
  }

  function hideCtrls() {
    controls.forEach(ctrl => ctrl.style.display = 'none');
  }

  function showCtrls() {
    controls.forEach(ctrl => ctrl.removeAttribute('style'));
  }

  function getDimensions() {
    return {
      outer: { ...outer.getBoundingClientRect().toJSON(), scrollWidth: outer.scrollWidth },
      inner: { ...inner.getBoundingClientRect().toJSON(), scrollWidth: inner.scrollWidth }
    }
  }

  function getIncrement(direction) {
    if (direction === 'right') return state.dimensions.outer.width;
    if (direction === 'left') return -state.dimensions.outer.width;
  }

  function setOuterWidth(width) {
    outer.style.setProperty(`--outer-width`, `${width}px`);
  }
}
