import * as express from 'express';

abstract class Controller {
    abstract intializeRoutes(): any;
    public router = express.Router();
}

export default Controller;
