import path, { dirname, extname } from "path"
import { fileURLToPath } from "url"
import fs from "fs";
import multer from "multer"

const fname = fileURLToPath(import.meta.url)
const dname = dirname(fname)

const publicDirectory = path.join(dname, "../../../public")

export const parseFile = multer()

export const uploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file
    const extension = extname(originalname)
    const fileName = `${req.params.id}${extension}`
    const pathToFile = path.join(publicDirectory, fileName)
    fs.writeFileSync(pathToFile, buffer)
    const link = `http://localhost:3001/${fileName}`
    req.file = link
    next()
  } catch (error) {
    next(error)
  }
}