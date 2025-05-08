import ERROR from '@/Libs/error.js'

const validatorFields = ({ data, shape }) => {
  if(!shape.every(key => key in data)) return ERROR.INVALID_FIELDS()
  return true
}

export default validatorFields