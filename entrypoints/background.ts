export default defineBackground(() => {
  console.log("Hello from Gist AI background!", { id: browser.runtime.id });

  // Remove existing context menu items to avoid duplicates
  chrome.contextMenus.removeAll(() => {
    // Create context menu item
    chrome.contextMenus.create({
      id: 'ask-gist-ai',
      title: 'Ask Gist AI',
      contexts: ['selection'],
      type: 'normal',
    });
  });

  // Initialize sidepanel settings
  chrome.runtime.onInstalled.addListener(() => {
    chrome.sidePanel.setOptions({
      enabled: true,
      path: 'sidepanel.html'
    });
  });

  // Handle context menu click
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'ask-gist-ai' && info.selectionText) {
      // Store the selected text
      chrome.storage.local.set({ 
        selectedText: info.selectionText 
      }, () => {
        // After storing text, open sidepanel directly in the click handler
        if (tab?.id) {
          chrome.sidePanel.open({ tabId: tab.id }).catch(error => {
            console.error('Failed to open with tabId, trying windowId');
            // Fallback to current window if tab fails
            chrome.windows.getCurrent().then(window => {
              if (window.id) {
                chrome.sidePanel.open({ windowId: window.id });
              }
            });
          });
        }
      });
    }
  });

  // Set initial panel behavior
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

  // Listen for messages from content script
  chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type === 'TEXT_SELECTED') {
      // Store the selected text
      chrome.storage.local.set({ selectedText: message.text });
    }
  });
});
