import Repository from "./Repository";
const resource: string = "/balances";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
    createPost(payload: Object) {
        return Repository.post(`${resource}`, payload);
    },
};
