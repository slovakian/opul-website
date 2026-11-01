import { createRouter } from "@solidjs/router";
import { HomePage } from "./pages/Home";
import { DownloadPage } from "./pages/Download";
import { ReleasesPage } from "./pages/Releases";
import { PrivacyPage } from "./pages/Privacy";
import { NotFoundPage } from "./pages/NotFound";
import "./styles.css";

const Router = createRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/download", component: DownloadPage },
    { path: "/releases", component: ReleasesPage },
    { path: "/privacy", component: PrivacyPage },
    { path: "*404", component: NotFoundPage },
  ],
});

export default function App() {
  return <Router>{(props) => props.children}</Router>;
}
