// import { z } from 'zod'
// import { zValidator } from '@hono/zod-validator'
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import authors from "./authors";
import books from "./books";
import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";

export const runtime = "edge";

const app = new Hono().basePath("/api");

// app
// .get('/hello',  (c) => {
//   return c.json({
//     message: 'Hello Next.js!',
//   })
// })
// .get("/hello/:test",
//     zValidator("param", z.object({
//         test: z.string()
//     })),

//     (c) => {
//     const {test} = c.req.valid("param");
//     return c.json({
//         message: "hello world",
//         test: test
//     })
// })
// .post("/create/:postId",
//   zValidator("json", z.object({
//     name: z.string(),
//     userId: z.string()
//   })),
//   zValidator("param", z.object({

//     postId: z.string()
//   })),
//   (c) => {
//   const {postId} = c.req.valid("param")
//   const {name, userId} = c.req.valid("json")
//   return c.json({

//   })
// })

app.route("/authors", authors);
app.route("/books", books);
app.get("/hello", clerkMiddleware(), (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.json({
      error: "Unauthorized",
    });
  }
  return c.json({
    message: "Hello Next.js!",
    userId: auth.userId,
  });
});

const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
