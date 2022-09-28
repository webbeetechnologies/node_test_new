import * as express from 'express';
import App from "../app";

abstract class Controller {
    abstract intializeRoutes(): any;
    public router = express.Router();
}

export default Controller;
