import { createFileRoute } from "@tanstack/react-router";
import { SelectScreen } from "@/components/select-screen";

export const Route = createFileRoute("/")({ component: SelectScreen });
