//ROUTE TO GET THE SPECIFIC CLASS DETAILS
import { NextResponse } from "next/server"
import queryDB from "../../Libs/queryDB"

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params

    // Primero, eliminar los estudiantes que pertenecen al grupo
    await queryDB({
      entity: "estudiante",
      queryType: "deleteMany",
      filter: { GroupId: parseInt(id) }
    })

    // Luego, eliminar el grupo
    const deletedGroup = await queryDB({
      entity: "group",
      queryType: "delete",
      filter: { id: parseInt(id) }
    })

    return NextResponse.json(deletedGroup)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const GET = async (request, { params }) => {
  try {
    const id = params.id // ✅ extract id here too
    const response = await queryDB({
      entity: "group",
      queryType: "findUniqueStudents",
      filter: { id: parseInt(id) }
    })
    if (!response) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 })
    }
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}