import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import { ReviewModel } from "./review.model";

@Table({
  tableName: "movie",
  timestamps: true,
})
export class MovieModel extends Model {
  @Column(DataType.NUMBER)
  tmdbId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.DATE)
  releaseDate: Date;

  @Column(DataType.STRING)
  poster: string;

  @Column(DataType.STRING)
  overview: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @HasMany(() => ReviewModel, "movieId")
  reviews: ReviewModel[];
}
