import axios from "axios";
const baseDomein: string = process.env.HOST;
export default axios.create({
    baseURL: baseDomein,
    withCredentials: true,
});
