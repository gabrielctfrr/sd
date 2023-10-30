const supertest = require("supertest");
const expect = require("expect");
const app = require("../app");
const db1 = require("../db1");
const Alimento = require("../models/Alimentos");

const request = supertest(app);
const endpoint = "/api/alimentos";

describe(endpoint, () => {
  beforeAll(async () => {
    await db1.connect();
  });

  afterAll(async () => {
    await db1.close();
  });

  describe("GET /", () => {
    it("deve retornar todos os alimentos", async () => {
      const titles = ["m1", "m2"];
      const alimentos = titles.map((title) => ({
        title,
      }));
      await Alimento.insertMany(alimentos);

      const res = await request.get(endpoint);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      titles.forEach((title) =>
        expect(res.body.some((m) => m.title === title))
      );

      await Alimento.deleteMany({ title: { $in: titles } });
    });
  });

  describe("POST /", () => {
    it("deve retornar 400 se a solicitação não for válida", async () => {
      const res = await request.post(endpoint).send({});

      expect(res.status).toBe(400);
    });

    it("deve armazenar o alimento e retornar 201 se a solicitação for válida", async () => {
      const alimento = { title: "m" };

      const res = await request.post(endpoint).send(alimento);

      expect(res.status).toBe(201);
      expect(res.body.title).toBe(alimento.title);
      expect(res.body._id).toBeTruthy();

      await Alimento.findByIdAndDelete(res.body._id);
    });
  });

  describe("DELETE /:id", () => {
    it("deve retornar 404 se o alimento não foi encontrado", async () => {
      const res = await request.delete(endpoint);

      expect(res.status).toBe(404);
    });

    it("deve deletar o alimento e voltar 204", async () => {
      const alimento = new Alimento({ title: "m" });
      await alimento.save();

      const res = await request.delete(`${endpoint}/${alimento._id}`);

      expect(res.status).toBe(204);

      const alimentoInDB = await Alimento.findById(alimento._id);
      expect(alimentoInDB).toBeFalsy();
    });
  });
});
