import { ReviewModel } from "../models";

export const indexUserReviewsService = async (userName: string) => {
  const reviews = await ReviewModel.findAll({where: {userName}});
  return reviews;
};
