const TOGGLE_STATE = 'data-toggle-state';

export default function SiteToggles() {
  const toggles = document.querySelectorAll('[data-toggle]');
  if (!toggles || toggles.length < 1) return;
  toggles.forEach(Toggle);
}

function Toggle(toggle) {
  const { controls } = toggle.dataset;
  const items = controls.split(',').map(it => document.querySelector(`[data-ctrl="${it}"]`));

  setInitialStates();
  toggle.addEventListener('click', onToggle);

  function onToggle() {
    setStates();
  }

  function setInitialStates() {
    items.forEach(it => it && it.setAttribute(TOGGLE_STATE, false))
  }

  function setStates() {
    items.forEach(setState)
  }

  function setState(item) {
    const currentState = item.getAttribute(TOGGLE_STATE) === 'true';
    item && item.setAttribute('data-toggle-state', !currentState)
  }
}
