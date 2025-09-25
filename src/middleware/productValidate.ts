import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { createProductSchema } from "../schema/product.schema.ts";


export const productMiddleware = async (req: Request, resp: Response, next: NextFunction) => {
  try {
    const { title, content, price } = createProductSchema.parse(req.body);

    // Custom rule
    if (title === "wali") {
      return resp.status(400).json({
        status: "error",
        message: "Title 'wali' is not allowed",
      });
    }
    else{
            next(); // everything is valid
    }


  } catch (error: any) {
    if (error instanceof ZodError) {
      return resp.status(400).json({
        errors: error.issues.map((e) => e.message), // readable messages
      });
    }

    resp.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};
