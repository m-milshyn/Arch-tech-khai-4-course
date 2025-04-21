import express from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { products } from '../db/schema.js'

const router = express.Router()

router.post('/products', async (req, res, next) => {
    try {
        await db.insert(products).values(req.body)
        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
})

router.delete('/products/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const found = await db
            .select()
            .from(products)
            .where(eq(products.id, Number(id)))
        if (found.length === 0) {
            return res.status(404).json({ message: `Product with id = ${id} not found` })
        }
        await db
            .delete(products)
            .where(eq(products.id, Number(id)))
        res.status(200).json({ message: `Product with id = ${id} deleted successfully` })
    } catch (err) {
        next(err)
    }
})

router.get('/products', async (req, res, next) => {
    try {
        const { name, brand, id } = req.query
        let query = db.select().from(products)
        if (name) {
            query = query.where(eq(products.name, name))
        }
        if (brand) {
            query = query.where(eq(products.brand, brand))
        }
        if (id) {
            query = query.where(eq(products.id, Number(id)))
        }
        const list = await query

        if (list.length === 0) {
            return res.status(404).json({ message: 'No user records found in the database' })
        }
        res.json(list)
    } catch (err) {
        next(err)
    }
})

export default router