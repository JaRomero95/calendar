import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PORT = process.env.REACT_APP_API_PORT;

const baseURL = `${BASE_URL}:${PORT}`;

const httpClient = axios.create({
  baseURL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpClient;
