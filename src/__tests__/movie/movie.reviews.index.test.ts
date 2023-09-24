import request from "supertest";
import { app } from "../../index";
import { close, connect } from "../../database";


describe("Movie reviews", () => {
  beforeAll(() => connect());
  afterAll(() => close());

  it("Create a review for a new movie and fetch it", async () => {
    const data = {
      tmdbId: 100,
      userName: "John Doe",
      rating: 10,
    };

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    
    const res2 = await request(app).get(`/api/v1/movies/${data.tmdbId}/reviews`).send(data);
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty("data");
    expect(res2.body.data[0].movie.tmdbId).toBe(data.tmdbId);
    expect(res2.body.data).toHaveLength(1);

    const res3 = await request(app).post("/api/v1/reviews").send(data);
    expect(res3.statusCode).toBe(200);
    expect(res3.body).toHaveProperty("data");
    
    const res4 = await request(app).get(`/api/v1/movies/${data.tmdbId}/reviews`).send(data);
    expect(res4.statusCode).toBe(200);
    expect(res4.body).toHaveProperty("data");
    expect(res4.body.data[0].movie.tmdbId).toBe(data.tmdbId);
    expect(res4.body.data).toHaveLength(2);
  });
});
