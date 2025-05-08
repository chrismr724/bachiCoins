import { omit } from 'ramda'

const OMIT_DATA = ['active', 'createdAt','updatedAt']

const cleanerData = ({ payload, omitProps = [] }) => {
  return omit([...OMIT_DATA, ...omitProps], payload)
}

export default cleanerData