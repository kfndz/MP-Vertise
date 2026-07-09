import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

app.listen(Number(env.PORT), () => {
  console.log(`🚀 Backend running on port ${env.PORT}`);
});
