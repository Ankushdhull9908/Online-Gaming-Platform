const BASE_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "https://online-gaming-platform-1zcz.onrender.com";

export const SOCKET_URL = BASE_URL;

const API = `${BASE_URL}/api`;

export default API;