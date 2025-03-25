"use client";
import { useRef } from "react";
import { Button, Group, Title } from "@mantine/core";

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

  return (
    <div className="w-full max-w-3xl mt-5 p-6 bg-gray-900 rounded-lg shadow-lg">
      {/* 🔹 Formatting Buttons */}
      <Group position="center" className="mb-4 gap-3">
        <Button
          variant="outline"
          color="gray"
          size="md"
          onClick={resetStyles}
          className="px-4 py-2 bg-teal-200 text-black mr-2"
        >
          Reset All
        </Button>
        <Button
          variant="filled"
          color="blue"
          size="md"
          onClick={() => document.execCommand("bold")}
          className="px-4 py-2  bg-teal-200 text-black mr-2"
        >
          Bold
        </Button>
        <Button
          variant="filled"
          color="teal"
          size="md"
          onClick={() => document.execCommand("underline")}
          className="px-4 py-2  bg-teal-200 text-black mr-2"
        >
          Underline
        </Button>
      </Group>

      {/* 🔹 Foreground Colors */}
      <div className="mb-4">
        <Title order={6} className="text-center text-white mb-2">
          Foreground Colors
        </Title>
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(colorMap).map(([name, hex]) => (
            <button
              key={name}
              className="w-10 h-10 rounded-full border border-gray-500 hover:scale-110 transition shadow-md"
              style={{ backgroundColor: hex }}
              onClick={() => applyStyle("fg", name)}
            />
          ))}
        </div>
      </div>

      {/* 🔹 Background Colors */}
      <div className="mb-4">
        <Title order={6} className="text-center text-white mb-2">
          Background Colors
        </Title>
        <div className="flex flex-wrap gap-3 justify-center">
          {Object.entries(bgColorMap).map(([name, hex]) => (
            <button
              key={name}
              className="w-10 h-10 rounded-full border border-gray-500 hover:scale-110 transition shadow-md"
              style={{ backgroundColor: hex }}
              onClick={() => applyStyle("bg", name)}
            />
          ))}
        </div>
      </div>

      {/* 🔹 Editable Text Area */}
      <div
        ref={editorRef}
        contentEditable
        className="w-full p-4 min-h-[120px] bg-gray-800 text-white rounded-md border border-gray-600 outline-none focus:ring-2 focus:ring-blue-500 transition"
        style={{ whiteSpace: "pre-wrap" }}
      />

      {/* 🔹 Copy Buttons */}
      <Group position="center" className="mt-5 gap-3">
        <Button
          className=" bg-teal-200 text-black mr-2"
          color="blue"
          size="md"
          fullWidth
          onClick={() =>
            navigator.clipboard.writeText(editorRef.current.innerHTML)
          }
        >
          Copy Text as Normal
        </Button>
        <Button
          className=" bg-teal-200 text-black mr-2"
          color="green"
          size="md"
          fullWidth
          onClick={() => alert("Copy for Discord (ANSI) Clicked!")}
        >
          Copy for Discord (ANSI)
        </Button>
      </Group>
    </div>
  );
}
