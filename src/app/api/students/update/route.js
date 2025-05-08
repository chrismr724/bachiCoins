import { NextResponse } from "next/server"
import queryDB from "../../Libs/queryDB"

export const PUT = async (request) => {
  try {
    const data = await request.json()
    const response = await queryDB({
      entity: "estudiante",
      queryType: "update",
      data: {
        Monedas: data.Monedas
      },
      filter: {
        Matricula: data.Matricula
      }
    })
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}