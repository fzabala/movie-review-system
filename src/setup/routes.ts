import { Router, RequestHandler, Express } from "express";
import { API_VERSION } from "../constant";
import * as routes from "../routes";

export interface RouteConfig {
  method:
    | "all"
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";
  name: string;
  handlers: RequestHandler[];
}

export const addRoutes = (app: Express) => {
  const routeConfigs = Object.entries(routes).map((e) => e[1]);

  const router = Router();
  routeConfigs.forEach((routeConfig) => {
    routeConfig.forEach((route) => {
      router[route.method.toLowerCase()](
        `${API_VERSION}${route.name}`,
        route.handlers,
      );
    });
  });
  router.get(`${API_VERSION}`, (req, res) => res.send({ data: "=)" }));

  app.use(router);
};
