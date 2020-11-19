import "regenerator-runtime/runtime";
import { debounce } from "lodash"

const DELAY = 300;

export default function QuickSearch() {
  const quickSearch = document.querySelector('[data-quick-search]');
  if (!quickSearch) return;
  const close = quickSearch.querySelector('[data-quick-search-close]');
  const input = quickSearch.querySelector('[data-quick-search-input]');
  const opens = document.querySelectorAll('[data-quick-search-open]');
  const results = quickSearch.querySelector('[data-quick-search-results]');
  const viewAll = quickSearch.querySelector('[data-quick-search-view-all]');

  // Listeners
  quickSearch.addEventListener('submit', onSubmit);
  close.addEventListener('click', onClose);
  opens.forEach(open => open.addEventListener('click', onOpen))
  const debouncedInput = debounce(onInputKeyup, DELAY)
  input.addEventListener('keyup', debouncedInput)

  // Handlers
  function onClose() {
    quickSearch.setAttribute('aria-hidden', true);
    input.value = '';
    results.innerHTML = '';
  }

  function onOpen() {
    quickSearch.setAttribute('aria-hidden', false);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (input.value.length > 0) goToSearchPage(input.value);
  }

  function onInputKeyup(e) {
    const { value } = e.target;
    if (value.length < 1) return reset();
    fetchResults(value);
  }

  async function fetchResults(val) {
    try {
      const res = await fetch(`/search/suggest.json?q=${val}&resources[type]=product`);
      const data = await res.json();
      const products = data?.resources?.results?.products;
      buildResults(products);
    } catch(e) {
      console.error(e);
    }
  }

  function goToSearchPage(input) {
    window.location.href = `${window.location.origin}/search?q=${input}`;
  }

  function buildResults(items) {
    if (!items) return reset();
    const availItems = items.filter(item => item.available);
    const itemsMarkup = availItems.map(buildResult);
    results.innerHTML = itemsMarkup.join('')
    viewAll.removeAttribute('style');
  }

  function buildResult(item) {
    const price = getPriceMarkup(item);
    const featImg = getFeaturedImage(item.featured_image.url);
    return `
      <li class="quick-search-results__item">
        <a class="quick-search-results-item__link" href="${item.url}">
          <img class="quick-search-results-item-link__image" src="${featImg}" alt="${item.title}">
          <section class="quick-search-results-item-link__content">
            <div class="quick-search-results-item-link__title">${item.title}</div>
            <div class="quick-search-results-item-link__price">${price}</div>
          </section>
        </a>
      </li>
    `;
  }

  function reset() {
    results.innerHTML = '';
    viewAll.style.display = 'none';
  }

  function getPriceMarkup(item) {
    const min = parseFloat(item.price_min);
    const max = parseFloat(item.price_max);
    if (min === max) return `$${item.price}`;
    return `Starting at $${min}`;
  }

  function getFeaturedImage(url) {
    const imgUrlArray = url.split(".jpg");
    return `${imgUrlArray[0]}_300x.jpg${imgUrlArray[1]}`;
  }
}
