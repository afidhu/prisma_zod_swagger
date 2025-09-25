import { Router } from "express";
import { addProduct, getProduct, getSingleProduct, updateProduct } from "../controller/productController.ts";
import { productMiddleware } from "../middleware/productValidate.ts";

const router = Router();

/**
 * @openapi
 * /product:
 *   get:
 *     tags:
 *       - products
 *     description: Get all products
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', [getProduct]);

/**
 * @openapi
 * /product:
 *   post:
 *     tags:
 *       - product
 *     description: Add a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *           example:
 *             title: wali
 *             content: "well to eat"
 *             price: 0.0
 *     responses:
 *       201:
 *         description: Product added successfully
 */
router.post('/', [productMiddleware, addProduct]);




/**
 * @openapi
 * /product/{id}:
 *   put:
 *     tags:
 *       - product
 *     summary: Update a single product
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product update failed
 */

router.put('/:id', [productMiddleware, updateProduct]);


/**
 * @openapi
 * /product/{id}:
 *   get:
 *     tags:
 *       - product
 *     summary: get a single product  
 *     parameters:
 *        - name: id
 *          in: path
 *          description: get a single product Id is required
 *          required: true
 *     responses:
 *       200:
 *         description: Product get successfully
 */




router.get('/:id', getSingleProduct);

export default router;
