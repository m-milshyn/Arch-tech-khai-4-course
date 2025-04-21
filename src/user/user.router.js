import express from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { users, products } from '../db/schema.js'

const router = express.Router()

router.post('/users', async (req, res, next) => {
    try {
        const { email } = req.body
        const [existing] = await db
            .select()
            .from(users)
            .where(eq(users.email, email))

        if (existing) {
            return res
                .status(409)
                .json({ message: `User with ${email} already exists` })
        }

        await db.insert(users).values(req.body)
        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
})


router.delete('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const found = await db
            .select()
            .from(users)
            .where(eq(users.id, Number(id)))
        if (found.length === 0) {
            return res.status(404).json({ message: `User with id = ${id} not found` })
        }
        await db
            .delete(users)
            .where(eq(users.id, Number(id)))
        res.status(200).json({ message: `User with id = ${id} deleted successfully` })
    } catch (err) {
        next(err)
    }
})

router.get('/users', async (req, res, next) => {
    try {
        const { name, email, id } = req.query
        let query = db.select().from(users)
        if (name) {
            query = query.where(eq(users.name, name))
        }
        if (email) {
            query = query.where(eq(users.email, email))
        }
        if (id) {
            query = query.where(eq(users.id, Number(id)))
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

router.get('/users/:id/products', async (req, res, next) => {
    try {
        const { id } = req.params
        const userProducts = await db
            .select()
            .from(products)
            .where(eq(products.userId, Number(id)))
        res.json(userProducts)
    } catch (err) {
        next(err)
    }
})

export default router