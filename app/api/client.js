import { create } from "apisauce";
// import { response } from 'express';

const client = create({
  baseURL: "http://192.168.18.13:9001/api/",
});

export default client;
