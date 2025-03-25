"use client";
import TextEditor from "./TextEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center">
        Hit's discord Colored Text Generator
      </h1>
      <TextEditor />
      <p className="mt-4 text-sm text-gray-400 text-center">
        This is an unofficial tool, it is not made or endorsed by Discord.
      </p>
    </div>
  );
}
