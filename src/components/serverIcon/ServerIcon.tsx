import { cn } from "@/lib/utils";
import useFixMount from "../../hooks/useFixMount";

const COLORS = [
  "#1e3799",
  "#f6b93b",
  "#e55039",
  "#b8e994",
  "#60a3bc",
  "#000000",
];

const getServerLetters = (name: string) => {
  let serverLetters = "";
  const words: string[] = name.split(" ");

  if (words.length === 1) {
    // If there's only one word, return the first two letters
    serverLetters = words[0].slice(0, 2);
  } else {
    // If there are multiple words, get the first and last words
    const firstWord = words[0];
    const lastWord = words[words.length - 1];

    // Return the first letter of the first word and the last letter of the last word
    serverLetters = `${firstWord.charAt(0)}${lastWord.charAt(0)}`;
  }

  return serverLetters;
};

export default function ServerIcon({ name }: { name: string }) {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  if (useFixMount()) return;
  const serverLetters = getServerLetters(name);

  return (
    <div
      className={cn("flex justify-center items-center w-full", `bg-[${color}]`)}
    >
      <p className="font-semibold text-lg tracking-widest text-white">
        {serverLetters}
      </p>
    </div>
  );
}
