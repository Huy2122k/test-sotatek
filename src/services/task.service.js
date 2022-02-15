import http from "./http-common";
class TaskDataService {
    getAll(title) {
        return http.get("/tasks",{ params: {titleSearch: title} });
    }
    create(data) {
        return http.post("/tasks", data);
    }
    update(data) {
        return http.put("/tasks", data);
    }
    delete(titleList) {
        return http.post("/tasks/delete",  titleList );
    }
    deleteAll() {
        return http.delete(`/tasks`);
    }
    findByTitle(title) {
        return http.get(`/tasks?title=${title}`);
    }
}
export default new TaskDataService();
