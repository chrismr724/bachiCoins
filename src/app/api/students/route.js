import { NextResponse } from "next/server"
import queryDB from "../Libs/queryDB"

/* export const POST = async (request, { params }) => {
  try {
    const data = await request.json()
    const response = await queryDB({
      entity: "estudiante",
      queryType: "create",
      data
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} */

export const POST = async (request) => {
  try {
    const searchParams = request.nextUrl.searchParams
    const groupId = searchParams.get("GroupId")
    const response = await queryDB({
      entity: "estudiante",
      queryType: "findMany",
      filter: { GroupId: parseInt(groupId)}
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
