import { bexBackground } from "quasar/wrappers";

chrome.browserAction.onClicked.addListener((/* tab */) => {
  // Opens our extension in a new browser window.
  // Only if a popup isn't defined in the manifest.
  chrome.tabs.create(
    {
      url: chrome.extension.getURL("www/index.html"),
    },
    (/* newTab */) => {
      // Tab opened.
    }
  );
});

declare module "@quasar/app-vite" {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];

    "storage.get": [{ key: string | null }, any];
    "storage.set": [{ key: string; value: any }, any];
    "storage.remove": [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

export default bexBackground((bridge /* , allActiveConnections */) => {
  bridge.on("log", ({ data, respond }) => {
    console.log(`[BEX] ${data.message}`, ...(data.data || []));
    respond();
  });

  bridge.on("getTime", ({ respond }) => {
    respond(Date.now());
  });

  bridge.on("storage.get", ({ data, respond }) => {
    const { key } = data;
    if (key === null) {
      chrome.storage.local.get(null, (items) => {
        // Group the values up into an array to take advantage of the bridge's chunk splitting.
        respond(Object.values(items));
      });
    } else {
      chrome.storage.local.get([key], (items) => {
        respond(items[key]);
      });
    }
  });
  // Usage:
  // const { data } = await bridge.send('storage.get', { key: 'someKey' })

  bridge.on("storage.set", ({ data, respond }) => {
    chrome.storage.local.set({ [data.key]: data.value }, () => {
      respond();
    });
  });
  // Usage:
  // await bridge.send('storage.set', { key: 'someKey', value: 'someValue' })

  bridge.on("storage.remove", ({ data, respond }) => {
    chrome.storage.local.remove(data.key, () => {
      respond();
    });
  });

  chrome.tabs.onCreated.addListener((tab: any) => {
    bridge.send("bex.tab.opened", { url: tab.url });
  });
  // Usage:
  // await bridge.send('storage.remove', { key: 'someKey' })

  /*
  // EXAMPLES
  // Listen to a message from the client
  bridge.on('test', d => {
    console.log(d)
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onCreated.addListener(tab => {
    bridge.send('browserTabCreated', { tab })
  })

  // Send a message to the client based on something happening.
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      bridge.send('browserTabUpdated', { tab, changeInfo })
    }
  })
   */

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const tab: any = tabs[0];
      chrome.tabs.executeScript(tab.id, {
        code: `
          var mainUrl = "${tab.url}";
          var iconUrl = "${tab.favIconUrl}";
  
          // Log or use the main URL and icon image URL as needed
          console.log("Main URL:", mainUrl);
          console.log("Icon Image URL:", iconUrl);
        `,
      });
    }
  });
});
