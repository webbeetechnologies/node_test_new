import Controller from "../../core/controller";
import { EventsService } from "./events.service";
import App from "../../app";
import { NextFunction, Request, Response } from "express";

class EventController extends Controller {
    public path = '/events';
    private eventsService: EventsService;
    private _app;

  constructor(app: App) {
    super();
    this._app = app;
    this.intializeRoutes();
    this.eventsService = new EventsService();
  }

  public intializeRoutes() {
        this.router.get(this.path.concat('/warmupevents'), this.getWarmupEvents.bind(this));
        this.router.get(this.path.concat('/events'), this.getEventsWithWorkshops.bind(this));
        this.router.get(this.path.concat('/futureevents'), this.getFutureEventWithWorkshops.bind(this));
    }

    async getWarmupEvents(req: Request, res: Response, next: NextFunction) {
        return await this.eventsService.getWarmupEvents()
          .then((data) => {
              res.json(data);
          })
          .catch((e: Error) => {
              next(e);
          });
    }

    async getEventsWithWorkshops(req: Request, res: Response, next: NextFunction) {
        return await this.eventsService.getEventsWithWorkshops()
          .then((data) => {
              res.json(data);
          })
          .catch((e: Error) => {
              next(e);
          });
    }

    async getFutureEventWithWorkshops(req: Request, res: Response, next: NextFunction) {
        return await this.eventsService.getFutureEventWithWorkshops()
          .then((data) => {
              res.json(data);
          })
          .catch((e: Error) => {
            next(e);
        });
    }
}

export default EventController;
