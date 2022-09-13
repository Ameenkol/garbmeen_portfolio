import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url"
// import dotenv from "dotenv";
// dotenv.config();

export const client = sanityClient({
  projectId: "pd035q26",
  dataset: "production",
  apiVersion: "2022-09-03",
  useCdn: true,
  token: "skRrpamYaErNCosfr6lMIckBi45sHUCDnNMT6pSDVUSrlIRWwTyUz7mj4xbfQHMO2Y3ePQaDs7M9xenKUzXOD1ZRr3y4xfIcgFDfzYTuGCZNe5oDzYd00Tz0Pe0g3rW6FvZPOMJl9ICSzqeWByGW9pMQKka5ffu4kuGZQ8YEvzWz07kkHTCf",
})


const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)