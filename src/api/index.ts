import { Hono } from 'hono';
import { cors } from "hono/cors";
import { agentRoutes } from "./routes/agent";
import { contentRoutes } from "./routes/content";
import { contactRoutes } from "./routes/contact";

const app = new Hono()
  .basePath('api');

app.use(cors({ origin: "*" }));

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));
app.route("/agent", agentRoutes);
app.route("/content", contentRoutes);
app.route("/contact", contactRoutes);

export default app;
