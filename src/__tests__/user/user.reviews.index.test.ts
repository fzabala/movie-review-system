import request from "supertest";
import { app } from "../../index";
import { close, connect } from "../../database";


describe("User reviews", () => {
  beforeAll(() => connect());
  afterAll(() => close());

  it("Create reviews for a movie from different users", async () => {
    const data = {
      tmdbId: 100,
      userName: "John Doe",
      rating: 10,
    };

    const data2 = {
      tmdbId: 100,
      userName: "Dohn Joe",
      rating: 10,
    };

    const res = await request(app).post("/api/v1/reviews").send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
    
    const res2 = await request(app).get(`/api/v1/users/${data.userName}/reviews`).send(data);
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toHaveProperty("data");
    expect(res2.body.data).toHaveLength(1);

    const res3 = await request(app).post("/api/v1/reviews").send(data);
    expect(res3.statusCode).toBe(200);
    expect(res3.body).toHaveProperty("data");
    
    const res4 = await request(app).get(`/api/v1/users/${data.userName}/reviews`).send(data);
    expect(res4.statusCode).toBe(200);
    expect(res4.body).toHaveProperty("data");
    expect(res4.body.data).toHaveLength(2);

    //review from other user
    const res5 = await request(app).post("/api/v1/reviews").send(data2);
    expect(res5.statusCode).toBe(200);
    expect(res5.body).toHaveProperty("data");
    
    const res6 = await request(app).get(`/api/v1/users/${data.userName}/reviews`).send(data);
    expect(res6.statusCode).toBe(200);
    expect(res6.body).toHaveProperty("data");
    expect(res6.body.data).toHaveLength(2);
    
    const res7 = await request(app).get(`/api/v1/users/${data2.userName}/reviews`).send(data);
    expect(res7.statusCode).toBe(200);
    expect(res7.body).toHaveProperty("data");
    expect(res7.body.data).toHaveLength(1);
  });
});
