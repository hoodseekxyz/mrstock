import { createFileRoute } from "@tanstack/react-router";
import { RulesScreen } from "@/components/rules-screen";

export const Route = createFileRoute("/rules")({ component: RulesScreen });
