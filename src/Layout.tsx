import { useEffect, useState } from "react";

import {
  Archive,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LogIn,
  Menu,
  MessageCircle,
  MessageCircleCodeIcon,
  Moon,
  Settings2,
  Sun,
} from "lucide-react";
import { Outlet } from "react-router";
import { useSocketStore } from "./common/context/useSocketStore";
import { useSocketHandler } from "./common/hooks/useSocketHandler";
import NavItem from "./components/layout/NavItem";
import { Toaster } from "./components/ui/toast";
import { useToolbarContextStore } from "./modules/whatsapp/context/useToolbarContextStore";

const onSafeAction = async (callback?: () => Promise<void>) => {
  if (!callback) {
    return;
  }

  await callback();
};

const Layout = () => {
  const { toolbarContext } = useToolbarContextStore();

  const { socket, connect, disconnect } = useSocketStore();
  useSocketHandler({ socket, connect, disconnect });

  const [themeLight, setThemeLight] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setThemeLight(!themeLight);
  };

  useEffect(() => {
    if (themeLight) {
      document.getElementsByTagName("body")[0].classList.replace("dark", "light");
      return;
    }

    document.getElementsByTagName("body")[0].classList.replace("light", "dark");
  }, [themeLight]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-background">
      <aside
        className={`${sidebarOpen ? "w-60" : "w-18"} hidden shrink-0 flex-col border-r border-border bg-sidebar transition-all duration-300 lg:flex`}
        aria-label="Navegación principal"
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MessageCircleCodeIcon className="size-4" fill="currentColor" />
          </div>

          {sidebarOpen && (
            <span className="font-mono text-sm font-semibold tracking-tight">Messaging</span>
          )}
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Secciones">
          <NavItem icon={<MessageCircle />} label="Nueva Campaña" expanded={sidebarOpen} path="/" />

          <NavItem
            icon={<LogIn />}
            label="Iniciar Sesión"
            expanded={sidebarOpen}
            path="/auth-whatsapp"
          />

          <NavItem
            icon={<Archive />}
            label="Borradores"
            count="0"
            expanded={sidebarOpen}
            path="/drafts"
          />

          <NavItem
            icon={<BarChart3 />}
            label="Analítica"
            expanded={sidebarOpen}
            path="/analytics"
          />

          <div className="my-4 border-t border-border"></div>

          <NavItem
            icon={<Settings2 />}
            label="Configuración"
            expanded={sidebarOpen}
            path="/settings"
          />
        </nav>

        {/* add user profile (Optional) */}
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden cursor-pointer"
              onClick={toggleSidebar}
              aria-label="Abrir navegación"
            >
              <Menu className="size-5" />
            </button>

            <button
              type="button"
              className="hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground lg:block cursor-pointer"
              onClick={toggleSidebar}
              aria-label="Colapsar navegación"
            >
              {sidebarOpen ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </button>

            <div>
              <p className="text-sm font-medium">{toolbarContext?.title || ""}</p>

              <p className="text-xs text-muted-foreground">{toolbarContext?.subTitle || ""}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Help button */}
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              aria-label="Ayuda"
            >
              <CircleHelp className="size-4" />
            </button>

            {/* Notification button */}
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              aria-label="Notificaciones"
            >
              <Bell className="size-4" />
            </button>

            {/* Theme button */}
            <button
              type="button"
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
              aria-label="Cambiar tema"
              onClick={toggleTheme}
            >
              {themeLight ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>

            <div className="mx-2 hidden h-5 border-l border-border sm:block" />

            {/* Save draft button */}
            {toolbarContext?.showSecondaryButton && (
              <button
                type="button"
                className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium hover:bg-muted cursor-pointer"
              >
                {toolbarContext?.secondaryButtonIcon !== undefined &&
                  toolbarContext?.secondaryButtonIcon}
                {toolbarContext?.secondaryButtonText || "secondary button"}
              </button>
            )}

            {/* send button */}
            {toolbarContext?.showMainButton && (
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 cursor-pointer"
                onClick={() => onSafeAction(toolbarContext?.mainButtonAction)}
              >
                {toolbarContext?.mainButtonIcon !== null && toolbarContext?.mainButtonIcon}
                {toolbarContext?.mainButtonText || "main button"}
              </button>
            )}
          </div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col overflow-auto">
          <Outlet />
          <Toaster />
        </main>
      </section>
    </div>
  );
};

export default Layout;
