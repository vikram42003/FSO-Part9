import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAll = async () => {
  const result = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
  return result.data;
};

export default {
  getAll,
};
