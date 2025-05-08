import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import ERROR from '@/Libs/error.js'
import queryDB from '@/app/api/Libs/queryDB.js'
import validatorFields from '@/app/api/Libs/validatorFields.js'
import { Profe } from '@/app/api/entities.js'
import cleanerData from '../../Libs/cleanerData.js'

 export const POST = async request => {
  try {
    const data = await request.json()
    const isValid = validatorFields({ data, shape: Profe.shape })
    if (!isValid) return ERROR.INVALID_FIELDS()

    const existingUser = await queryDB({
      entity: 'profesor',
      queryType: 'findUnique',
      filter: { email: data.email }
    })

    if (existingUser) return ERROR.USER_ALREADY_EXISTS()
    const hashedPassword = await bcrypt.hash(data.password, 10)

    const payload = await queryDB({
      entity: 'profesor',
      queryType: 'create',
      data: {
        ...data,
        name: data.email.split('@')[0],
        password: hashedPassword,
      }
    })

    const response = cleanerData({ payload })

    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
} 
