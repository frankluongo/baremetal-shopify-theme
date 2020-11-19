import EasyInstaFeed from "easy-instagram-feed";
import { LazyBg } from "./Lazy"

export default function Instagram() {
  const feed = document.querySelector('[data-feed-wrapper]');
  if (!feed) return;
  const feedlist = feed.querySelector('[data-instagram-feed]');
  const { brandUrl, feedUrl, posts, name } = feed.dataset;
  const parsedUrl = parseUrl();

  runnit();

  async function runnit() {
    const photos = await EasyInstaFeed(parsedUrl);
    if (!photos) return null;
    await new Promise((res) => {
      photos.forEach((item, i) => { addPhoto(item); if (i === photos.length - 1) res();})});
    const items = feed.querySelectorAll('[data-instagram-item]');
    if (!items) return null;
    items.forEach(LazyBg)
  }

  function addPhoto(photo) {
    feedlist.innerHTML += `
      <a
      class="instagram-feed-item"
      data-instagram-item
      data-src="${photo.node.thumbnail_src}"
      href="${brandUrl}"
      target="_blank" rel="noopener noreferrer"
      title="Instagram Photo"
      alt="Instagram Photo"
      >
        <span class="visually-hidden>Check Out ${name} on Instagram</span>
      </a>
    `;
  }


  function parseUrl() {
    const urlObj = {};
    const feedArr = decodeURIComponent(feedUrl).split('?');
    const origin = feedArr[0];
    const params = feedArr[1].split('&');
    urlObj.query_hash = params[0].split('=')[1];
    urlObj.variables = JSON.parse(params[1].split('variables')[1].replace('=', ''));
    urlObj.first = parseInt(posts);
    delete urlObj.variables.after;
    return encodeURI(`${origin}?query_hash=${urlObj.query_hash}&variables={"id":"${urlObj.variables.id}","first":"${posts}"}`);
  }
}


