import Repository from "./Repository";
const resource: string = "/session";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
    post(payload: Object) {
        return Repository.post(`${resource}`, payload);
    },
    delete() {
        return Repository.delete(`${resource}`);
    },
};
