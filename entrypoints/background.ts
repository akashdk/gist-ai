export default defineBackground(() => {
  console.log("Hello from Gist AI background!", { id: browser.runtime.id });

  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
});
