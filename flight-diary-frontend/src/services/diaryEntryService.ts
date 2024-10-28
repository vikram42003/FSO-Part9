import axios from "axios";
import { Entry, NewEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const response = await axios.get<Entry[]>(baseUrl);
  return response.data;
};

const addEntry = async (entry: NewEntry) => {
  const response = await axios.post<Entry>(baseUrl, entry);
  return response.data;
};

const diaryEntryService = {
  getAll,
  addEntry,
};

export default diaryEntryService;
