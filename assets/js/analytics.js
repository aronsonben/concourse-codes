(function () {
  if (typeof window.gtag !== 'function') return;

  var SECTION_FALLBACK = 'aside, nav, section, table, header, footer, main';

  function clean(text, max) {
    return (text || '').replace(/\s+/g, ' ').trim().slice(0, max || 80);
  }

  function linkText(a) {
    var img = a.querySelector('img');
    return clean(a.textContent) ||
      clean(a.getAttribute('aria-label')) ||
      clean(a.getAttribute('title')) ||
      (img ? clean(img.getAttribute('alt')) : '');
  }

  function linkSection(a) {
    var tagged = a.closest('[data-track-section]');
    if (tagged) return tagged.getAttribute('data-track-section');
    var el = a.closest(SECTION_FALLBACK);
    if (!el) return 'page';
    return el.id || el.getAttribute('class') && el.getAttribute('class').split(/\s+/)[0] || el.tagName.toLowerCase();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;

    var url;
    try {
      url = new URL(a.href, window.location.href);
    } catch (err) {
      return;
    }

    var params = {
      link_url: url.href,
      link_domain: url.hostname,
      link_text: linkText(a),
      link_section: linkSection(a),
      link_page: window.location.pathname,
      link_target: a.getAttribute('target') || '_self'
    };

    if (url.protocol === 'mailto:') {
      params.link_url = url.protocol + url.pathname;
      gtag('event', 'mailto_click', params);
      return;
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    var external = url.hostname !== window.location.hostname;
    gtag('event', external ? 'outbound_click' : 'internal_click', params);
  }, true);

  // Exposed for page scripts that need to fire custom events.
  window.trackEvent = function (name, params) {
    gtag('event', name, Object.assign({ link_page: window.location.pathname }, params || {}));
  };
})();
