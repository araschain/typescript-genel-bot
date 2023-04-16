import { Events } from "../Interfaces";

export const Event: Events = {
  name: "ready",
  once: false,

  async execute(client) {

    console.log(`Aktif: ${client.user?.tag}`)
  
  },
};