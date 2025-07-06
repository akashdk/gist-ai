

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    console.log('Content script loaded'); // Debug log

    // Listen for text selection
    document.addEventListener('mouseup', () => {
      const selectedText = window.getSelection()?.toString()?.trim();
      if (selectedText) {
        console.log('Selected text:', selectedText); // Debug log
        // Send selected text to background script
        chrome.runtime.sendMessage({ type: 'TEXT_SELECTED', text: selectedText });
      }
    });
  },
});
