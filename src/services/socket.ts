import { io } from "socket.io-client";
import { config } from "src/config";

export const socket = io(config.api.restUrl);
