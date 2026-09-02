document.addEventListener('DOMContentLoaded', function () {
  const rssFeedUrl = 'https://lowpolybrainblasts.pika.page/posts_feed';
  const rssFeedContainer = document.getElementById('rss-feed');
  if (!rssFeedContainer) return;

  const SNIPPET_LENGTH = 220;
  const PREVIEW_COUNT = 3;

  function getLink(el) {
    const linkEl = el.querySelector('link');
    if (!linkEl) return '#';
    return linkEl.getAttribute('href') || linkEl.textContent || '#';
  }

  function getDate(el) {
    const dateEl = el.querySelector('published') || el.querySelector('updated');
    if (!dateEl || !dateEl.textContent) return '';
    const parsed = new Date(dateEl.textContent);
    if (isNaN(parsed)) return '';
    return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function getSnippet(el) {
    const contentEl = el.querySelector('summary') || el.querySelector('content');
    if (!contentEl || !contentEl.textContent) return '';
    const plainText = contentEl.textContent.replace(/\s+/g, ' ').trim();
    if (plainText.length <= SNIPPET_LENGTH) return plainText;
    return plainText.slice(0, SNIPPET_LENGTH).replace(/\s+\S*$/, '') + '\u2026';
  }

  fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then((data) => {
      const items = data.querySelectorAll('entry');
      let previewHtml = '<div class="blog-previews">';
      let listHtml = '<div>';

      items.forEach((el, index) => {
        const titleEl = el.querySelector('title');
        const title = titleEl ? titleEl.textContent : 'Untitled';
        const link = getLink(el);

        if (index < PREVIEW_COUNT) {
          const date = getDate(el);
          const snippet = getSnippet(el);
          previewHtml += `
            <div class="blog-preview-card">
              <a class="blog-preview-title-link" href="${link}" target="_blank" rel="noopener noreferrer">
                <p class="blog-preview-title">${title}</p>
              </a>
              ${date ? `<p class="blog-preview-meta">${date}</p>` : ''}
              ${snippet ? `<p class="blog-preview-snippet">${snippet}</p>` : ''}
              <a class="blog-preview-more" href="${link}" target="_blank" rel="noopener noreferrer">More --&gt;</a>
            </div>`;
        }

        listHtml += `<p><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></p>`;
      });

      previewHtml += '</div><h3 class="blog-other-posts-heading">Other Posts</h3>';
      listHtml += '</div>';
      rssFeedContainer.innerHTML = previewHtml + listHtml;
    })
    .catch((error) => {
      console.error('Error fetching the RSS feed:', error);
      rssFeedContainer.innerHTML = '<p>Failed to load RSS feed.</p>';
    });
});
