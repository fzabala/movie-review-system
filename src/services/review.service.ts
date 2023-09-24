import { ReviewModel } from "../models";
import { showMovieService } from "./movie.service";

export const reviewCreateService = async (
  tmdbId: number,
  userName: string,
  rating: number,
) => {
  const movie = await showMovieService(tmdbId);
  const review = await ReviewModel.create({
    tmdbId,
    userName,
    rating,
    movieId: movie.id,
  });

  return review;
};
