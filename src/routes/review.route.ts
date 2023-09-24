import { API_CONSTANT } from "../constant";
import { RouteConfig } from "../setup";
import { reviewCreate } from "../controllers";
import { reviewCreateValidator } from "../validators";

export const reviewRouteConfig: RouteConfig[] = [
  {
    method: "post",
    name: `${API_CONSTANT.REVIEW}`,
    handlers: [reviewCreateValidator, reviewCreate],
  },
];
