import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import Index from "./pages/index";
import Consultas from "./pages/consultas";
import ChatPage from "./pages/chat";
import PrivacyPolicy from "./pages/privacy";
import LegalNotice from "./pages/legal";
import AreaPage from "./pages/area";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { EditorProvider } from "./components/EditorContext";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function App() {
  return (
    <Provider>
      <EditorProvider>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/consultas" component={Consultas} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/privacidade" component={PrivacyPolicy} />
        <Route path="/avisos-legais" component={LegalNotice} />
        <Route path="/areas/:slug" component={AreaPage} />
      </Switch>
      {import.meta.env.DEV && <AgentFeedback />}
      {<RunableBadge />}
      </EditorProvider>
    </Provider>
  );
}

export default App;
