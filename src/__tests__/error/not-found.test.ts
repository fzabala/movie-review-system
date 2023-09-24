import request from "supertest";
import { app } from "../../index";
import { close, connect } from "../../database";


describe("Not found", () => {
  beforeAll(() => connect());
  afterAll(() => close());

  it("Page not found", async () => {
    const res = await request(app).post("/api/v1/non-real-endpoint");
    expect(res.statusCode).toBe(404);
  });
});
