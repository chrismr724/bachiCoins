import jwt from 'jsonwebtoken'
import ERROR from '~/Libs/error'

const authenticateToken = ({ headers, neededAdmind = false }) => {
  const authHeader = headers.get('authorization')
  const token = authHeader && authHeader.replace(/Bearer /,'')
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET)
    return userId
  }
  return ERROR.FORBIDDEN()
}

export default authenticateToken