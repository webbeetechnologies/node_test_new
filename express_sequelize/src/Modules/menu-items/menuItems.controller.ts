import Controller from "../../core/controller";
import { MenuItemsService } from "./menu-items.service";
import App from "../../app";
import { NextFunction, Request, Response } from "express";

export class MenuItemsController extends Controller {
  public path = '/menu-items';
  private menuItemService: MenuItemsService;
  private _app: App;

  constructor(app: App) {
    super();
    this._app = app;
    this.intializeRoutes();
    this.menuItemService = new MenuItemsService();
  }

  public intializeRoutes() {
    this.router.get(this.path.concat("/menu"), this.getMenuItems.bind(this));
  }

  /*
   Requirements:
   - your code should result in EXACTLY one SQL query no matter the nesting level or the amount of menu items.
   - it should work for infinite level of depth (children of childrens children of childrens children, ...)
   - verify your solution with `npm run test`
   - do a `git commit && git push` after you are done or when the time limit is over
   Hints:
   - open the `src/menu-items/menu-items.service.ts` file
   - partial or not working answers also get graded so make sure you commit what you have
   Sample response on GET /menu:
   ```json
   [
       {
           "id": 1,
           "name": "All events",
           "url": "/events",
           "parentId": null,
           "createdAt": "2021-04-27T15:35:15.000000Z",
           "children": [
               {
                   "id": 2,
                   "name": "Laracon",
                   "url": "/events/laracon",
                   "parentId": 1,
                   "createdAt": "2021-04-27T15:35:15.000000Z",
                   "children": [
                       {
                           "id": 3,
                           "name": "Illuminate your knowledge of the laravel code base",
                           "url": "/events/laracon/workshops/illuminate",
                           "parentId": 2,
                           "createdAt": "2021-04-27T15:35:15.000000Z",
                           "children": []
                       },
                       {
                           "id": 4,
                           "name": "The new Eloquent - load more with less",
                           "url": "/events/laracon/workshops/eloquent",
                           "parentId": 2,
                           "createdAt": "2021-04-27T15:35:15.000000Z",
                           "children": []
                       }
                   ]
               },
               {
                   "id": 5,
                   "name": "Reactcon",
                   "url": "/events/reactcon",
                   "parentId": 1,
                   "createdAt": "2021-04-27T15:35:15.000000Z",
                   "children": [
                       {
                           "id": 6,
                           "name": "#NoClass pure functional programming",
                           "url": "/events/reactcon/workshops/noclass",
                           "parentId": 5,
                           "createdAt": "2021-04-27T15:35:15.000000Z",
                           "children": []
                       },
                       {
                           "id": 7,
                           "name": "Navigating the function jungle",
                           "url": "/events/reactcon/workshops/jungle",
                           "parentId": 5,
                           "createdAt": "2021-04-27T15:35:15.000000Z",
                           "children": []
                       }
                   ]
               }
           ]
       }
   ]
 */

  async getMenuItems(req: Request, res: Response, next: NextFunction) {
    return await this.menuItemService.getMenuItems()
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((e: Error) => {
        next(e);
      });
  }
}
