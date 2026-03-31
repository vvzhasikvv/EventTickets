import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Health endpoint", () => {
  it("returns 200 and status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("Not found", () => {
  it("returns 404 for unknown route", async () => {
    const res = await request(app).get("/unknown");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message");
  });
});
