import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scholarships/")({
  validateSearch: (search: Record<string, unknown>) => search,
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/",
      search,
      replace: true,
    });
  },
  component: () => null,
});
