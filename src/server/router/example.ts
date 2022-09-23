import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("countdown", {
    input: z
      .object({
        date: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        countdown: `Countdown to ${input?.date ?? "wedding"}`,
      };
    },
  });
