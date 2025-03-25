"use client";
import { useRef } from "react";

const colorMap = {
  gray: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  pink: 35,
  teal: 36,
  white: 37,
};

const bgColorMap = {
  black: 40,
  red: 41,
  orange: 42,
  gray: 43,
  purple: 44,
  lightgray: 45,
  white: 47,
};

export default function TextEditor() {
  const editorRef = useRef(null);

  const applyStyle = (type, color) => {
    if (!document.getSelection().toString()) return;
    document.execCommand(
      type === "fg" ? "foreColor" : "hiliteColor",
      false,
      color
    );
  };

  const resetStyles = () => {
    document.execCommand("removeFormat", false, null);
    editorRef.current.innerHTML = editorRef.current.innerText;
  };

  const rgbToAnsi = (rgb) => {
    const rgbMap = {
      "rgb(128, 128, 128)": "2;30", // Dim Gray
      "rgb(255, 0, 0)": "2;31", // Dim Red
      "rgb(0, 255, 0)": "2;32", // Dim Green
      "rgb(255, 255, 0)": "2;33", // Dim Yellow
      "rgb(0, 0, 255)": "2;34", // Dim Blue
      "rgb(255, 0, 255)": "2;35", // Dim Magenta (Pink)
      "rgb(0, 255, 255)": "2;36", // Dim Cyan (Teal)
      "rgb(255, 255, 255)": "2;37", // Dim White
    };
    return rgbMap[rgb] || null;
  };

  const bgRgbToAnsi = (rgb) => {
    const bgRgbMap = {
      "rgb(0, 0, 0)": "2;40", // Dim Black
      "rgb(255, 0, 0)": "2;41", // Dim Red
      "rgb(255, 165, 0)": "2;42", // Dim Orange
      "rgb(128, 128, 128)": "2;43", // Dim Gray
      "rgb(128, 0, 128)": "2;44", // Dim Purple
      "rgb(211, 211, 211)": "2;45", // Dim Light Gray
      "rgb(255, 255, 255)": "2;47", // Dim White
    };
    return bgRgbMap[rgb] || null;
  };

  const copyForDiscord = () => {
    if (!editorRef.current) return;

    let selection = window.getSelection();
    let range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    let content = range
      ? range.cloneContents()
      : editorRef.current.cloneNode(true);
    let elements = content.childNodes;

    let ansiText = "```ansi\n";

    elements.forEach((node) => {
      let text = node.textContent;
      if (!text.trim()) return;

      let ansiStart = "\u001b[";
      let ansiEnd = "\u001b[0m";
      let ansiCodes = [];

      if (node.nodeType === Node.ELEMENT_NODE) {
        const styles = window.getComputedStyle(node);

        // Extract Foreground Color
        let fgAnsi = rgbToAnsi(styles.color);
        if (fgAnsi) ansiCodes.push(fgAnsi);

        // Extract Background Color
        let bgAnsi = bgRgbToAnsi(styles.backgroundColor);
        if (bgAnsi) ansiCodes.push(bgAnsi);
      }

      if (ansiCodes.length) {
        ansiStart += ansiCodes.join(";") + "m";
      } else {
        ansiStart = ""; // No ANSI styling needed
      }

      ansiText += ansiStart + text + ansiEnd;
    });

    ansiText += "\n```";

    navigator.clipboard.writeText(ansiText).then(() => {
      alert("Copied ANSI formatted text for Discord!");
    });
  };

  return (
    <div className="w-full max-w-3xl mt-5 p-4 bg-gray-800 rounded-lg shadow-md">
      <div className="flex justify-center gap-2 mb-3">
        <button
          className="px-3 py-1 border border-gray-500 rounded text-sm"
          onClick={resetStyles}
        >
          Reset All
        </button>
        <button
          className="px-3 py-1 border border-gray-500 rounded text-sm font-bold"
          onClick={() => document.execCommand("bold")}
        >
          Bold
        </button>
        <button
          className="px-3 py-1 border border-gray-500 rounded text-sm underline"
          onClick={() => document.execCommand("underline")}
        >
          Underline
        </button>
      </div>

      <div className="flex gap-2 justify-center mb-3">
        FG
        {Object.keys(colorMap).map((color) => (
          <button
            key={color}
            className="w-6 h-6 rounded border border-gray-400"
            style={{ backgroundColor: color }}
            onClick={() => applyStyle("fg", color)}
          />
        ))}
      </div>

      <div className="flex gap-2 justify-center mb-3">
        BG
        {Object.keys(bgColorMap).map((color) => (
          <button
            key={color}
            className="w-6 h-6 rounded border border-gray-400"
            style={{ backgroundColor: color }}
            onClick={() => applyStyle("bg", color)}
          />
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="w-full p-3 min-h-[120px] bg-gray-700 text-white rounded outline-none border border-gray-500 overflow-hidden"
        style={{ whiteSpace: "pre-wrap" }}
      />

      <button
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          navigator.clipboard.writeText(editorRef.current.innerHTML)
        }
      >
        Copy text as normal
      </button>

      <button
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={copyForDiscord}
      >
        Copy for Discord (ANSI)
      </button>
    </div>
  );
}
