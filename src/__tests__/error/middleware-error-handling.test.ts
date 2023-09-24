import request from "supertest";
import { app } from "../../index";
import { close, connect } from "../../database";
import * as userService from "../../services/user.service";


describe("Middleare error", () => {
  beforeAll(() => connect());
  afterAll(() => close());

  it("Error is triggered in service", async () => {
    const ERR_MESSAGE = "happy error";
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const mockIndexUserReviewsService = jest.spyOn(userService, "indexUserReviewsService");
    mockIndexUserReviewsService.mockImplementationOnce(() => {
      throw new Error(ERR_MESSAGE)
    });
    const res = await request(app).get("/api/v1/users/someUser/reviews");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: ERR_MESSAGE });
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });
});
