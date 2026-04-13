import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const ingestRepo = (userId, githubUrl) => {
  return axios.post(`${API_BASE}/ingest`, {
    user_id: userId,
    github_url: githubUrl,
  });
};

export const askQuestion = (userId, question) => {
  return axios.post(`${API_BASE}/query`, {
    user_id: userId,
    question,
  });
};
