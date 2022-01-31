import Repository from "./Repository";
const resource: string = "/category_icons";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
};
