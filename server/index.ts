import express from "express"
import { membersData } from "../src/model/membersMockData"


const app = express()
const PORT = 3000

app.use(express.json())

// GET all members
app.get("/members", (req, res) => {
    res.json(membersData)
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

export default app