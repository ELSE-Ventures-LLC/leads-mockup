import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow text-gold mb-6">Error 404</p>
        <h1 className="font-serif text-6xl text-navy">Page not found</h1>
        <p className="mt-4 text-navy/70">
          The page you're looking for has moved or no longer exists.
        </p>
        <div className="mt-8">
          <Link to="/" className="btn-gold">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-4xl text-navy">This page didn't load</h1>
        <p className="mt-3 text-navy/70">Something went wrong. Try again or return home.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost text-navy">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NewcrestImage — Long-term thinking. Lasting impact." },
      {
        name: "description",
        content:
          "NewcrestImage is a Dallas-based family office investment firm building long-term value across hospitality, real estate, and alternative assets.",
      },
      { name: "author", content: "NewcrestImage" },
      { property: "og:site_name", content: "NewcrestImage" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0D1B2A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NewcrestImage",
          url: "https://newcrestimage.com",
          description:
            "Dallas-based family office investment firm focused on hospitality, real estate, and alternative investments.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1785 State Hwy 26, Suite 400",
            addressLocality: "Grapevine",
            addressRegion: "TX",
            postalCode: "76051",
            addressCountry: "US",
          },
          telephone: "+1-214-774-4650",
          email: "Hello@NewcrestImage.com",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
