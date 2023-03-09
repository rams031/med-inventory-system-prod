import axios from "axios";
import Server from "./Server";

export default axios.create({
  baseURL: Server,
});
