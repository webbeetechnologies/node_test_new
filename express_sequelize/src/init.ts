import Server from "./server";

Server.init().then(async (app) => {
  await app.listen();
});
