import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray.at(0);
        const data = videoArray.at(1);
        return { id, ...data };
      })
      .filter((video) => {
        if (search) {
          return video.title.includes(search);
        }
        return true;
      });
  }

  create(videos) {
    const videoId = randomUUID();
    this.#videos.set(videoId, videos);
  }

  update(id, videos) {
    this.#videos.set(id, videos);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}
