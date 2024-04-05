const KEY = "authuser";

chrome.runtime.onMessage.addListener((message) => {
  chrome.storage.local.set({ [KEY]: message });
});

chrome.tabs.onCreated.addListener(function (tab) {
  if (!tab.pendingUrl) return;

  const url = new URL(tab.pendingUrl);
  if (!url.host.endsWith("cloud.google.com")) return;

  chrome.storage.local.get([KEY], function (result) {
    const authuser = result[KEY];
    url.searchParams.append("authuser", authuser);
    chrome.tabs.update(tab.id, { url: url.toString() });
  });
});
