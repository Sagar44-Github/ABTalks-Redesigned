import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { themeInitScript } from "../lib/theme";
import { StoreProvider, useStore } from "../lib/store";
import { Toast } from "../components/ab/toast";
import { Check, Snowflake } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center grid-bg bg-base px-4">
      <div className="max-w-lg text-center">
        <span className="font-mono mono-label uppercase tracking-[0.18em] text-muted-ink">
          Error 404
        </span>
        <h1 className="mt-4 font-display text-display-large uppercase text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-body">
          Nothing here. The URL might be wrong, or the page was moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink bg-yellow px-5 py-3 font-display text-label-bold uppercase text-on-yellow shadow-brutal press"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center grid-bg bg-base px-4">
      <div className="max-w-lg text-center">
        <span className="font-mono mono-label uppercase tracking-[0.18em] text-muted-ink">
          Something broke
        </span>
        <h1 className="mt-4 font-display text-heading-1 uppercase text-ink">
          This page didn't load
        </h1>
        <p className="mt-4 text-body">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink bg-yellow px-5 py-3 font-display text-label-bold uppercase text-on-yellow shadow-brutal press"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-none border-2 border-ink bg-card-surface px-5 py-3 font-display text-label-bold uppercase text-ink shadow-brutal press"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "ABTalks — 60-Day Proof-of-Work Challenge" },
        {
          name: "description",
          content:
            "Pick a track. Build daily. Prove it with a commit and a LinkedIn post. A 60-day coding challenge for Indian college students.",
        },
        { property: "og:site_name", content: "ABTalks" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;700;900&family=JetBrains+Mono:wght@700&display=swap",
        },
        { rel: "icon", href: "/abtalks-logo-icon.svg", type: "image/svg+xml" },
        { rel: "manifest", href: "/manifest.json" },
      ],
      scripts: [{ children: themeInitScript }],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ToastContainer() {
  const { toastMessage, clearToast } = useStore();
  if (!toastMessage) return null;

  const isFreezeMessage = toastMessage.toLowerCase().includes("freeze");

  return (
    <Toast
      message={toastMessage}
      onClose={clearToast}
      icon={
        isFreezeMessage ? (
          <Snowflake size={16} strokeWidth={3} className="text-blue" />
        ) : (
          <Check size={16} strokeWidth={3} className="text-blue" />
        )
      }
    />
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
        <ToastContainer />
      </StoreProvider>
    </QueryClientProvider>
  );
}
