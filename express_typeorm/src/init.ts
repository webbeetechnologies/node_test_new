import Server from "./server";
import app from "./app";

Server.init().then(async (app) => {
  await app.listen();
});
