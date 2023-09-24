import { API_CONSTANT } from "../constant";
import { RouteConfig } from "../setup";
import { indexUserReviews } from "../controllers";

export const userRouteConfig: RouteConfig[] = [
  {
    method: "get",
    name: `${API_CONSTANT.USER}/:userName/reviews`,
    handlers: [indexUserReviews],
  },
];
