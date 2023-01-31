import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/events");
  }

  get(id) {
    return http.get(`/events/${id}`);
  }

  create(data) {
    return http.post("/events", data);
  }

  update(id, data) {
    return http.put(`/events/${id}`, data);
  }

  delete(id) {
    return http.delete(`/events/${id}`);
  }

  deleteAll() {
    return http.delete(`/events`);
  }

  findByTitle(title) {
    return http.get(`/events?title=${title}`);
  }

  uploadfile(){    
    return http.get("/file");
  }
}

export default new TutorialDataService();