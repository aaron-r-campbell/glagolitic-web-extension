const code = `
if (typeof glagoliticCharacterMapping === "undefined") {
  console.log("defining glagoliticCharacterMapping", (glagoliticCharacterMapping = {
    // latin to glagolitic
    "a": "ⰰ", "b": "ⰱ", "c": "ⱌ", "č": "ⱍ", "ć": "Ⱋ", "d": "ⰴ", "dž": "ⰷ", "đ": "ⰼ", "e": "ⰵ", "f": "ⱇ",
    "g": "ⰳ", "h": "ⱈ", "i": ["ⰹ", "ⰺ", "ⰻ"], "j": "j", "k": "ⰽ", "l": "ⰾ", "m": "ⰿ", "n": "ⱀ",
    "o": "ⱁ", "p": "ⱂ", "q": "q", "r": "ⱃ", "s": "ⱄ", "š": "ⱎ", "t": "ⱅ", "u": "ⱆ", "v": "ⰲ",
    "w": "w", "x": "x", "y": "y", "z": "ⰸ", "ž": "ⰶ",
    "A": "Ⰰ", "B": "Ⰱ", "C": "Ⱌ", "Č": "Ⱍ", "Ć": "ⱋ", "D": "Ⰴ", "Dž": "Ⰷ", "Đ": "Ⰼ", "E": "Ⰵ", "F": "Ⱇ",
    "G": "Ⰳ", "H": "Ⱈ", "I": ["Ⰹ", "Ⰺ", "Ⰻ"], "J": "J", "K": "Ⰽ", "L": "Ⰾ", "M": "Ⰿ", "N": "Ⱀ",
    "O": "Ⱁ", "P": "Ⱂ", "Q": "Q", "R": "Ⱃ", "S": "Ⱄ", "Š": "Ⱎ", "T": "Ⱅ", "U": "Ⱆ", "V": "Ⰲ",
    "W": "W", "X": "X", "Y": "Y", "Z": "Ⰸ", "Ž": "Ⰶ",
    // glagolitic to latin
    "ⰰ": "a", "ⰱ": "b", "ⱌ": "c", "ⰴ": "d", "ⰷ": "dž", "ⰼ": "đ", "ⰵ": "e", "ⱇ": "f", "ⰳ": "g", "ⱈ": "h",
    "ⰹ": "i", "ⰺ": "i", "ⰻ": "i", "j": "j", "ⰽ": "k", "ⰾ": "l", "ⰿ": "m", "ⱀ": "n", "ⱁ": "o",
    "ⱂ": "p", "q": "q", "ⱃ": "r", "ⱄ": "s", "ⱎ": "š", "ⱅ": "t", "ⱆ": "u", "ⰲ": "v", "w": "w",
    "x": "x", "y": "y", "ⰸ": "z",
    "Ⰰ": "A", "Ⰱ": "B", "Ⱌ": "C", "Ⰴ": "D", "Ⰷ": "Dž", "Ⰼ": "Đ", "Ⰵ": "E", "Ⱇ": "F", "Ⰳ": "G", "Ⱈ": "H",
    "Ⰹ": "I", "Ⰺ": "I", "Ⰻ": "I", "J": "J", "Ⰽ": "K", "Ⰾ": "L", "Ⰿ": "M", "Ⱀ": "N", "Ⱁ": "O",
    "Ⱂ": "P", "Q": "Q", "Ⱃ": "R", "Ⱄ": "S", "Ⱎ": "Š", "Ⱅ": "T", "Ⱆ": "U", "Ⰲ": "V", "W": "W",
    "X": "X", "Y": "Y", "Ⰸ": "Z"
  }));
};


if (typeof cachedElementList === "undefined") {
  console.log("defining cachedElementList", (cachedElementList = []));
}


if (typeof functionHasRun === "undefined") {
  console.log("defining functionHasRun", (functionHasRun = false));
}


if (typeof replaceTextNodes === "undefined") {
  console.log(
    "defining replaceTextNodes",
    (replaceTextNodes = (node, functionHasRun) => {
      const { TEXT_NODE, ELEMENT_NODE } = Node;
      const replaceText = (node) => {
        if (node.nodeType === TEXT_NODE) {
          const textContent = [];
          let i = 0;
          const originalText = node.textContent;
          while (i < originalText.length) {
            const originalChar = originalText[i];
            let mappedChar = glagoliticCharacterMapping[originalChar] || originalChar;
            
            if (Array.isArray(mappedChar)) {
              mappedChar = mappedChar[Math.floor(Math.random() * mappedChar.length)]
            }

            // If not yet at the last character, look for multi-character conversions
            if (i < originalText.length - 1) {
              const nextChar = originalText[i + 1];
              
              // Look for "Dž" conversion
              if ((originalChar === "D" || originalChar === "d") && (nextChar === "Ž" || nextChar === "ž")) {
                const combinedChars = originalChar + nextChar;
                mappedChar = glagoliticCharacterMapping[combinedChars] || originalChar;
                i++; // Skip the next character since it"s part of the combined conversion
              }
            }
      
            textContent.push(mappedChar || originalChar);
            i++;
          }
          node.textContent = textContent.join("");
        }
      };      
      if (!functionHasRun) {
        console.log("walking");
        // Function has not been run before
        if (node.nodeType === TEXT_NODE) {
          replaceText(node);
          cachedElementList.push(node); // Add element to the cache
        } else if (node.nodeType === ELEMENT_NODE) {
          let childNode = node.firstChild;
          while (childNode) {
            replaceTextNodes(childNode, functionHasRun);
            childNode = childNode.nextSibling;
          }
        }
      } else {
        console.log("using cache");
        // Function has been run before, replace text for elements in the cache
        for (const cachedNode of cachedElementList) {
          replaceText(cachedNode);
        }
      }
      return true;
    })
  );
}

functionHasRun = replaceTextNodes(document.body, functionHasRun);
`;

function handleCommand(command) {
  if (command === "log_hello_world") {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      var activeTab = tabs[0];
      if (activeTab) {
        browser.tabs.executeScript(activeTab.id, { code: code });
      }
    });
  }
}

browser.commands.onCommand.addListener(handleCommand);
