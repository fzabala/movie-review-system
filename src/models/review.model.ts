import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import { MovieModel } from "./movie.model";

@Table({
  tableName: "review",
  timestamps: true,
})
export class ReviewModel extends Model {
  @Column(DataType.STRING)
  userName: string;

  @Column(DataType.NUMBER)
  rating: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @BelongsTo(() => MovieModel, "movieId")
  movie: MovieModel[];
}
