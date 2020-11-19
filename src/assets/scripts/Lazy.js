import { cacheImg } from "./utils"

const OPTS = {
  rootMargin: '0px',
  threshold: 0.1
}

export default function Lazy() {
  const lazyIframes = document.querySelectorAll('[data-lazy-iframe]')
  const lazyImages = document.querySelectorAll('[data-lazy-img]')
  const lazyBgs = document.querySelectorAll('[data-lazy-bg]')
  lazyImages.forEach(LazyImage)
  lazyIframes.forEach(LazyIframe)
  lazyBgs.forEach(LazyBg)
}

function LazyIframe(element) {
  const observer = new IntersectionObserver(onIntersect, OPTS);
  observer.observe(element);
  const src = element.dataset.src;

  function onIntersect(entries) {
    if (!entries[0].isIntersecting) return;
    setSrc();
    observer.unobserve(element);
  }

  function setSrc() {
    element.src = src;
  }
}

function LazyImage(element) {
  const observer = new IntersectionObserver(onIntersect, OPTS);
  observer.observe(element);
  const src = cacheImg(element.dataset.src).src;

  function onIntersect(entries) {
    if (!entries[0].isIntersecting) return;
    setSrc();
    observer.unobserve(element);
  }

  function setSrc() {
    element.src = src;
  }
}

export function LazyBg(element) {
  const observer = new IntersectionObserver(onIntersect, OPTS);
  observer.observe(element);
  const src = cacheImg(element.dataset.src).src;

  function onIntersect(entries) {
    if (!entries[0].isIntersecting) return;
    setBg();
    observer.unobserve(element);
  }

  function setBg() {
    element.style.backgroundImage = `url(${src})`;
  }
}
