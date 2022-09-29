import App from './app';
import EventsController from "./Modules/events/events.controller";
import { MenuItemsController } from "./Modules/menu-items/menuItems.controller";

export default class Server {
  private static app: App;

  public static getApp(): App {
    return this.app;
  }

  public static async close() {
    await this.getApp().getDataSource().close().then(async () => {
      await this.app.close()
    });
  }

  public static async init() {
    if (!this.app) {
      this.app = new App(
        (app: App) => {
          return [
            new EventsController(app),
            new MenuItemsController(app),
          ]
        },
        3000,
      );
    }

    await this.app.init();
    return this.app
  }
}
