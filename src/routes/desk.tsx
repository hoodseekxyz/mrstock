import { createFileRoute } from "@tanstack/react-router";
import { DeskScreen } from "@/components/desk-screen";

export const Route = createFileRoute("/desk")({ component: DeskScreen });
