import { NextResponse } from 'next/server'
import ERROR from '@/Libs/error.js'
import queryDB from '@/app/api/Libs/queryDB.js'
import validatorFields from '@/app/api/Libs/validatorFields.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Profe } from '../../entities.js'

export const POST = async request => {
  try {
    const data = await request.json()
    const isValid = validatorFields({ data, shape: Profe.shape })

    if (!isValid) return ERROR.INVALID_FIELDS()
    
    const profe = await queryDB({
      entity: 'profesor',
      queryType: 'findUnique',
      filter: { email: data.email },
    }) 
    if(!profe) return ERROR.INVALID_FIELDS()
    
    const isPasswordValid = await bcrypt.compare(data.password, profe.password)
    if(!isPasswordValid) return ERROR.INVALID_FIELDS()    
    const token = jwt.sign({ 
      userId: profe.id,
    }, process.env.JWT_SECRET)
    return NextResponse.json({ token, profe }, { status: 200 })
 
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
