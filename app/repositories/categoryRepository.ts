import Repository from "./Repository";
const resource: string = "/categories";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
};
