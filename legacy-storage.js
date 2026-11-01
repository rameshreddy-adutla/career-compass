// Compatibility reads only. Do not remove old keys or overwrite saved work.
// Historical identifiers are intentionally confined to this file.
(function () {
  "use strict";

  function read(currentKey, previousKey) {
    const current = localStorage.getItem(currentKey);
    return current === null ? localStorage.getItem(previousKey) : current;
  }

  window.CareerCompassLegacy = Object.freeze({
    readWorkspace: () => read("career-compass", "staff-engineer-os"),
    readTheme: () => read("career-compass-theme", "staff-os-theme"),
  });
})();
