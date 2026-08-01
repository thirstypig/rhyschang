/* Light / dark switch.
   Remembers what you picked, so the site stays that way next time. */

(function () {
  var btn = document.getElementById('theme-btn');
  if (!btn) return;

  function label() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = dark ? '☀️ Day' : '🌙 Night';
    btn.setAttribute('aria-label', dark ? 'Switch to day colours' : 'Switch to night colours');
  }

  btn.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });

  label();
})();
