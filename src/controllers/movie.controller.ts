import { Request, Response } from "express";
import { indexMovieReviewsService } from "../services";

export const indexMovieReviews = async (req: Request, res: Response) => {
  const tmdbId = req.params.tmdbId;

  try {
    const reviews = await indexMovieReviewsService(Number(tmdbId));
    return res.send({ data: reviews });
  } catch (e) {
    console.error(e.message, e.stack);
    return res.status(400).send({ error: e.message });
  }
};
