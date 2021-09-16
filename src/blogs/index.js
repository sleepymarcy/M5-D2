import express from "express"
import fs from "fs"
import uniqid from "uniqid"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

import {
    checkBlogPostSchema,
    checkSearchSchema,
    checkValidationResult,
} from "./validation.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const blogsFilePath = path.join(__dirname, "blogs.json")

const router = express.Router()

// get all blogs
router.get("/", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSON = JSON.parse(fileAsString)
        res.send(fileAsJSON)
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
});

router.get(
    "/search",
    checkSearchSchema,
    checkValidationResult,
    async (req, res, next) => {
        try {
            const { title } = req.query
            const fileAsBuffer = fs.readFileSync(blogsFilePath)
            const fileAsString = fileAsBuffer.toString()
            const array = JSON.parse(fileAsString)
            const filtered = array.filter((blog) =>
                blog.title.toLowerCase().includes(title.toLowerCase())
            )
            res.send(filtered)
        } catch (error) {
            res.send(500).send({ message: error.message })
        }
    }
);

// create  blog
router.post(
    "/",
    checkBlogPostSchema,
    checkValidationResult,
    async (req, res, next) => {
        try {
            const blog = {
                id: uniqid(),
                ...req.body,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const fileAsBuffer = fs.readFileSync(blogsFilePath)
            const fileAsString = fileAsBuffer.toString()
            const fileAsJSONArray = JSON.parse(fileAsString)

            fileAsJSONArray.push(blog)

            fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))

            res.send(blog)
        } catch (error) {
            res.send(500).send({ message: error.message })
        }
    }
);

// get single blogs
router.get("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)

        const blog = fileAsJSONArray.find((blog) => blog.id === req.params.id)
        if (!blog) {
            res
                .status(404)
                .send({ message: `blog with ${req.params.id} is not found!` })
        }
        res.send(blog)
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

// delete  blog
router.delete("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)

        const blog = fileAsJSONArray.find((blog) => blog.id === req.params.id)
        if (!blog) {
            res
                .status(404)
                .send({ message: `blog with ${req.params.id} is not found!` })
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (blog) => blog.id !== req.params.id
        )
        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.status(204).send()
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

//  update blog
router.put("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(blogsFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)

        const blogIndex = fileAsJSONArray.findIndex(
            (blog) => blog.id === req.params.id
        )
        if (!blogIndex == -1) {
            res
                .status(404)
                .send({ message: `blog with ${req.params.id} is not found!` })
        }
        const previousblogData = fileAsJSONArray[blogIndex]
        const changedblog = {
            ...previousblogData,
            ...req.body,
            updatedAt: new Date(),
            id: req.params.id,
        };
        fileAsJSONArray[blogIndex] = changedblog

        fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray))
        res.send(changedblog)
    } catch (error) {
        res.send(500).send({ message: error.message })
    }
})

export default router
