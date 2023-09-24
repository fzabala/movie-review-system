import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { validateRequest } from "../../utils";

export const reviewCreateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    tmdbId: Joi.number().required(),
    userName: Joi.string().required(),
    rating: Joi.number().min(1).max(10).required(),
  });
  validateRequest(req, res, next, schema);
};
