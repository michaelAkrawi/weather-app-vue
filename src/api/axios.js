import axios from "axios";
import AppConfig from "../AppConfig";


const api = axios.create({ baseURL: AppConfig.apiURL });
export { api }