"use client";
import { Container, Title, Text } from "@mantine/core";
import TextEditor from "./TextEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 flex flex-col items-center">
      <Title order={1} className="text-3xl font-bold text-center">
        Hit's Discord Colored Text Generator
      </Title>

      <TextEditor />

      <Text mt="4" size="sm" className="text-gray-400 text-center">
        This is an unofficial tool, it is not made or endorsed by Discord.
      </Text>
    </div>
  );
}
