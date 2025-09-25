import z from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - price
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         price:
 *           type: number
 *           default: 0.0
 */


export const createProductSchema = z.object({
    title: z.string().min(1, 'should not be null').max(10, 'must be small than 5'),
    content: z.string().nullable(),
    // content: z.email(),
    price:z.number().positive('must be positive').min(1, 'must be greater that 1')
})