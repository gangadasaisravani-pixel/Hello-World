import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  return (
    <main className="welcome-page" data-testid="page-welcome">
      <div className="welcome-shell">
        <header className="flex h-[76px] items-center justify-between">
          <div className="flex items-center gap-3" aria-label="Hello World">
            <span className="brand-mark" aria-hidden="true">h.</span>
            <span className="text-[13px] font-bold tracking-[-0.03em] text-foreground">hello, world</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">A FRESH START</span>
        </header>

        <section className="welcome-hero" aria-labelledby="welcome-title">
          <div className="hero-copy">
            <div className="eyebrow">A little place to begin</div>
            <h1 className="hero-title" id="welcome-title">
              Hello,<br /><em>world.</em>
            </h1>
            <p className="hero-description" data-testid="text-welcome-message">
              Every good thing starts somewhere. We’re glad this one starts with you.
            </p>
          </div>

          <div className="welcome-art" aria-label="A small welcome note" role="img">
            <div className="art-orbit" aria-hidden="true" />
            <div className="sun-disc" aria-hidden="true" />
            <div className="hello-card">
              <div className="card-topline">
                <span>NOTE NO. 001</span>
                <span className="card-dot" aria-hidden="true" />
              </div>
              <div className="card-message">Well, hello<br /><span>there.</span></div>
              <div className="card-rule" />
            </div>
            <span className="tiny-note">nice to meet you</span>
          </div>
        </section>

        <footer className="page-foot">
          <span>A new page, with room for whatever comes next.</span>
          <span className="foot-status">All yours</span>
        </footer>
      </div>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
