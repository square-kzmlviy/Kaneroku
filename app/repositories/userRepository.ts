import Repository from "./Repository";
const resource: string = "/users";
export default {
    createPost(payload: Object) {
        return Repository.post(`${resource}`, payload);
    },
};
