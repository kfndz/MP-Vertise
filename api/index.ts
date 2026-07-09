import serverless from "serverless-http";
import { createApp } from "../server/src/app.js";

const app = createApp();

export default serverless(app);