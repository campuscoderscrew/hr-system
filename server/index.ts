import express from "express"
import type { Member } from "../src/model/types"
import { membersData } from "../src/model/membersMockData"
import { addMember } from "../src/model/operations"


const app = express()
const PORT = 3000

app.use(express.json())

// GET all members
app.get("/members", (req, res) => {
    res.json(membersData)
})


// POST add a new member
app.post("/members", (req, res) => {
    const member: Member = req.body
    addMember(membersData, member)
    res.status(201).json(member)
})

// PUT move member to a new role (archives current role to history)
app.put("/members/:id/move", (req, res) => {
    // TODO
})

// PUT add a role to a member without removing existing role
app.put("/members/:id/add-role", (req, res) => {
    // TODO
})

// DELETE a member
app.delete("/members/:id", (req, res) => {
    // TODO
})



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
export default app