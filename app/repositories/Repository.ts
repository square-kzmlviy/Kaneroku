import axios from "axios";
const baseDomein: string = process.env.NEXT_PUBLIC_HOST_NAME;
export default axios.create({
    baseURL: baseDomein,
    withCredentials: true,
});
