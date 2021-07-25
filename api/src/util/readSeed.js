import fs from 'fs'
import path from 'path'

export default function readSeed(seedName) {
  const seedPath = path.resolve(
    process.cwd(),
    `./src/db/seeds/${seedName}.json`
  )
  const buffer = fs.readFileSync(seedPath, { encoding: 'utf8' })
  const rawData = buffer.toString()
  return JSON.parse(rawData)
}
