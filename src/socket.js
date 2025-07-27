import { io } from "socket.io-client";
const socket = io("https://polling-system-backend-o7sq.onrender.com/"); // change this URL for deployment
export default socket;
