import Repository from "./Repository";
const resource: string = "/balance_summarize";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
};
