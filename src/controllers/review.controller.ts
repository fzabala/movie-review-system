import { Request, Response } from "express";
import { reviewCreateService } from "../services";

export const reviewCreate = async (req: Request, res: Response) => {
  const { tmdbId, userName, rating } = req.body;
  try {
    const review = await reviewCreateService(tmdbId, userName, rating);
    return res.send({ data: review });
  } catch (e) {
    console.error(e.message, e.stack);
    return res.status(400).send({ error: e.message });
  }
};
