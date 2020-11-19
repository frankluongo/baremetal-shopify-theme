import MegaMenu from "./scripts/MegaMenu";
import Lazy from "./scripts/Lazy";
import QuickSearch from "./scripts/QuickSearch"
import SiteToggles from "./scripts/Toggles"

import "./styles/application.scss"

document.addEventListener('DOMContentLoaded', () => {
  QuickSearch();
  MegaMenu();
  Lazy();
  SiteToggles();
})
