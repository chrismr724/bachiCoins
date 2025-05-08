//ROUTE TO GET ALL GROUPS
import { NextResponse } from "next/server"
import queryDB from "../Libs/queryDB"

export const GET = async () => {
  try {
    const response = await queryDB({ entity: "group", queryType: "findManyStudents" })
    return NextResponse.json(response || [])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export const POST = async (request) => {
  try {
    const data = await request.json()
    const response = await queryDB({ entity: "group", queryType: "create", data: data })
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


