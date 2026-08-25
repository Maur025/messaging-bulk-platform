import { createBrowserRouter } from "react-router";
import App from "./App";
import Layout from "./Layout";
import AuthWhatsapp from "./modules/whatsapp/AuthWhatsapp";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "/auth-whatsapp",
        Component: AuthWhatsapp,
      },
      {
        path: "/drafts",
        Component: () => <h1>Drafts</h1>,
      },
      {
        path: "/analytics",
        Component: () => <h1>Analytics</h1>,
      },
      {
        path: "/settings",
        Component: () => <h1>Settings</h1>,
      },
    ],
  },
]);
