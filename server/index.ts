import express from "express"
import type { Member } from "../src/model/types"
import { membersData } from "../src/model/membersMockData"
import { addMember } from "../src/model/operations"
import { moveMember } from "../src/model/operations"
import { addRole } from "../src/model/operations"
import { removeMember } from "../src/model/operations"


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
    const id =req.params.id
    const { role } =req.body
    moveMember(membersData, id , role)
    const updatedMember = membersData.find(m => m.id === id)
    res.status(200).json(updatedMember)

})

// PUT add a role to a member without removing existing role
app.put("/members/:id/add-role", (req, res) => {
    const id =req.params.id
    const { role }=req.body
    addRole(membersData, id, role)
    const updatedMember = membersData.find(m=>m.id === id)
    res.status(200).json(updatedMember)
})

// DELETE a member
app.delete("/members/:id", (req, res) => {
    const id= req.params.id
    removeMember(membersData,id)
    
    res.status(200).json({message : 'member ${id} successfully deleted'})
})



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
export default app