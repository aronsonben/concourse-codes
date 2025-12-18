document.addEventListener('DOMContentLoaded', function () {
  const rssFeedUrl = 'https://lowpolybrainblasts.pika.page/posts_feed';
  const rssFeedContainer = document.getElementById('rss-feed');
  if (!rssFeedContainer) return;

  fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
      const items = data.querySelectorAll('entry');
      let html = '<div>';

      items.forEach((el) => {
        const titleEl = el.querySelector('title');
        const linkEl = el.querySelector('link');
        const title = titleEl ? titleEl.textContent : 'Untitled';
        const link = linkEl ? linkEl.textContent : '#';
        html += `<p><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></p>`;
      });

      html += '</div>';
      rssFeedContainer.innerHTML = html;
    })
    .catch((error) => {
      console.error('Error fetching the RSS feed:', error);
      rssFeedContainer.innerHTML = '<p>Failed to load RSS feed.</p>';
    });
});
