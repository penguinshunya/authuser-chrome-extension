const KEY = "authuser";

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get([KEY], function (result) {
    const authuser = result[KEY] || "";
    document.getElementById("input").value = authuser;
  });
});

document.getElementById("input").addEventListener("input", (e) => {
  chrome.runtime.sendMessage(e.target.value);
});
