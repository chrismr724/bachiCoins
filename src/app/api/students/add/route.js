import { NextResponse } from "next/server"
import queryDB from "../../Libs/queryDB"

export const POST = async ( request ) => {
  try {
    const data = await request.json()
    const response = await queryDB({
      entity: "estudiante",
      queryType: "create",
      data
    })
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}