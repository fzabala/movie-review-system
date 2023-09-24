import { API_CONSTANT } from "../constant";
import { RouteConfig } from "../setup";
import { indexMovieReviews } from "../controllers";

export const movieRouteConfig: RouteConfig[] = [
  {
    method: "get",
    name: `${API_CONSTANT.MOVIE}/:tmdbId/reviews`,
    handlers: [indexMovieReviews],
  },
];
