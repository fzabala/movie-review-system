import { Request, Response } from "express";
import { indexUserReviewsService } from "../services";

export const indexUserReviews = async (req: Request, res: Response) => {
  const userName = req.params.userName;
  try {
    const reviews = await indexUserReviewsService(String(userName));
    return res.send({ data: reviews });
  } catch (e) {
    console.error(e.message, e.stack);
    return res.status(400).send({ error: e.message });
  }
};
