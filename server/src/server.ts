import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.listen(Number(env.PORT), () => {
  console.log(`🚀 Backend running on port ${env.PORT}`);
});
