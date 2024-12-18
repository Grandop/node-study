import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DatabasePostgres();

server.post("/videos", async (request, response) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

server.get("/videos", async (request, response) => {
  const search = request.query.search;
  const videos = await database.list(search);
  return response.status(200).send(videos);
});

server.put("/videos/:id", async (request, response) => {
  const { title, description, duration } = request.body;
  const id = request.params.id;

  await database.update(id, {
    title,
    description,
    duration,
  });

  return response.status(204).send();
});

server.delete("/videos/:id", async (request, response) => {
  const videoId = request.params.id;
  await database.delete(videoId);
  return response.status(204).send();
});

server.listen({
  port: 3333,
});
