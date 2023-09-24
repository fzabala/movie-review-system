import request from "supertest";
import { app } from "../../index";
import { close, connect } from "../../database";
import * as movieService from "../../services/movie.service";
import { MovieModel } from "../../models";

const getMockedMovie = (tmdbId: number) => {
  const movieInstance = new MovieModel({
    id: 1,
    title: "Mocked Movie",
    releaseDate: new Date(),
    poster: "mocked_poster.jpg",
    overview: "Mocked overview",
    tmdbId,
  });
  return movieInstance;
};

describe("Review create", () => {
  beforeAll(() => connect());
  afterAll(() => close());

  it("Create a new review", async () => {
    const data = {
      tmdbId: 100,
      userName: "John Doe",
      rating: 10,
    };

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.userName).toBe(data.userName);
    expect(res.body.data.rating).toBe(data.rating);
    expect(res.body.data.movieId).toBeDefined();
  });

  it("Create a 2 reviews for same movie without fetching the second time", async () => {
    const mockFetchMovieData = jest.spyOn(movieService, "fetchMovieData");

    const data = {
      tmdbId: 101,
      userName: "John Doe",
      rating: 10,
    };

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.userName).toBe(data.userName);
    expect(res.body.data.rating).toBe(data.rating);
    expect(res.body.data.movieId).toBeDefined();

    expect(mockFetchMovieData).toBeCalledTimes(1);
    expect(mockFetchMovieData).toHaveBeenCalledWith(data.tmdbId);

    const res2 = await request(app).post("/api/v1/reviews").send(data);
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty("data");

    expect(mockFetchMovieData).toBeCalledTimes(1);
    mockFetchMovieData.mockClear();
  });

  it("Create a 2 reviews for different movies", async () => {
    const mockFetchMovieData = jest.spyOn(movieService, "fetchMovieData");
    const data = {
      tmdbId: 102,
      userName: "John Doe",
      rating: 10,
    };
    mockFetchMovieData.mockResolvedValueOnce(getMockedMovie(data.tmdbId));

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBe(200);
    expect(mockFetchMovieData).toBeCalledTimes(1);
    expect(mockFetchMovieData).toHaveBeenCalledWith(data.tmdbId);

    const data2 = {
      tmdbId: 103,
      userName: "John Doe",
      rating: 10,
    };

    const res2 = await request(app).post("/api/v1/reviews").send(data2);
    expect(res2.statusCode).toBe(200);

    expect(mockFetchMovieData).toBeCalledTimes(2);
    expect(mockFetchMovieData).toHaveBeenCalledWith(data2.tmdbId);
    mockFetchMovieData.mockClear();
  });

  it("Create a new review without enough information", async () => {
    const data = {
      tmdbId: 100,
      rating: 7,
    };

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors.length).toBeGreaterThanOrEqual(1);
    expect(
      res.body.errors.filter((e: { field: string }) => e.field === "userName")
        .length
    ).toBeGreaterThanOrEqual(1);
  });

  it("Create a new review with invalid parameters", async () => {
    const data = {
      tmdbId: 100,
      userName: "John Doe",
      rating: 99,
    };

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors.length).toBeGreaterThanOrEqual(1);
    expect(
      res.body.errors.filter((e: { field: string }) => e.field === "rating")
        .length
    ).toBeGreaterThanOrEqual(1);
  });
});
