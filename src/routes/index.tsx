import { createFileRoute } from "@tanstack/react-router";
import { Translator } from "@/components/translator";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <Translator />;
}
