export default function MegaMenu() {
  const megaMenu = document.querySelector("[data-mega-menu]");
  if (!megaMenu) return;
  const levelOneLinks = Array.from(megaMenu.querySelectorAll("[data-link-l1]"));

  levelOneLinks.forEach((item) => MegaMenuItem({ item, resetAll, resetOthers, setStates, levelOneLinks }));

  function resetOthers(target) {
    const otherItems = levelOneLinks.filter(item => item !== target);
    otherItems.forEach(item => item.parentElement.setAttribute('data-active', false));
  }

  function resetAll() {
    const all = levelOneLinks.map(item => item.parentElement);
    setStates(all, false);
  }

  function setStates(items, state) {
    items.forEach(item => item.setAttribute('data-active', state));
  }
}


function MegaMenuItem({item, resetAll, resetOthers, setStates, levelOneLinks }) {
  const touchState = { isTouch: false }
  const parent = item.parentElement;
  item.addEventListener('touchstart', onItemTouch, { passive: true });
  item.addEventListener('click', onClick);

  function onItemTouch() {
    touchState.isTouch = true;
  }

  function onClick(e) {
    if (touchState.isTouch) e.preventDefault();
    const item = e.target;
    resetOthers(item)
    setMenuState()
  }

  function setMenuState() {
    const isActive = parent.getAttribute("data-active") === "true";
    const newState = !isActive;
    setStates([parent], newState)
    if (newState) document.addEventListener('click', onTapWhileActive)
  }

  function onTapWhileActive(e) {
    if (parent.contains(e.target) || levelOneLinks.includes(e.target)) return;
    resetAll();
    document.removeEventListener('click', onTapWhileActive);
  }
}
