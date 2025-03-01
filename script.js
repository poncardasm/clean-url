document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const urlInput = document.getElementById('urlInput');
  const cleanButton = document.getElementById('cleanButton');
  const copyButton = document.getElementById('copyButton');
  const clearButton = document.getElementById('clearButton');
  const resultBox = document.getElementById('resultBox');

  // Clean URL function
  function cleanUrl(url) {
    try {
      // Create URL object to parse the input
      const urlObj = new URL(url.trim());

      // List of tracking parameters to remove
      const trackingParams = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'fbclid',
        'gclid',
        'ocid',
        'msclkid',
        'zanpid',
        'dclid',
        '_hsenc',
        '_hsmi',
        'mc_cid',
        'mc_eid',
        'yclid',
        'ref',
        'referrer',
        'source',
        'rcm',
        'share',
        'ref_src',
        'ref_url',
        'igshid',
      ];

      // Get all search parameters
      const searchParams = urlObj.searchParams;

      // Create a new URLSearchParams object to store non-tracking parameters
      const cleanParams = new URLSearchParams();

      // Check each parameter and keep only non-tracking ones
      for (const [key, value] of searchParams.entries()) {
        // Skip tracking parameters
        if (!trackingParams.includes(key) && !key.startsWith('utm_')) {
          // Check if this parameter seems essential (not a tracking parameter)
          // This is a simple heuristic and might need refinement
          if (
            key.length < 20 &&
            !key.includes('track') &&
            !key.includes('ref')
          ) {
            cleanParams.append(key, value);
          }
        }
      }

      // Construct the clean URL
      let cleanedUrl = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;

      // Add back non-tracking parameters if any exist
      const cleanParamsString = cleanParams.toString();
      if (cleanParamsString) {
        cleanedUrl += `?${cleanParamsString}`;
      }

      // Add back hash/fragment if it exists
      if (urlObj.hash) {
        cleanedUrl += urlObj.hash;
      }

      return cleanedUrl;
    } catch (error) {
      console.error('Error cleaning URL:', error);
      return 'Invalid URL. Please check your input.';
    }
  }

  // Event listeners
  cleanButton.addEventListener('click', function () {
    const inputUrl = urlInput.value;
    if (!inputUrl) {
      resultBox.textContent = 'Please enter a URL';
      copyButton.disabled = true;
      return;
    }

    const cleanedUrl = cleanUrl(inputUrl);
    resultBox.textContent = cleanedUrl;
    copyButton.disabled = false;
  });

  copyButton.addEventListener('click', function () {
    const cleanedUrl = resultBox.textContent;
    navigator.clipboard
      .writeText(cleanedUrl)
      .then(() => {
        // Temporarily change button text to indicate success
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';

        setTimeout(() => {
          copyButton.textContent = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard. Please copy manually.');
      });
  });

  clearButton.addEventListener('click', function () {
    urlInput.value = '';
    resultBox.textContent = '';
    copyButton.disabled = true;
    urlInput.focus();
  });

  // Enable "Enter" key to trigger clean button
  urlInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      cleanButton.click();
    }
  });
});
