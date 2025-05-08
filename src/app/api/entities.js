export const Profe = {
  name: 'profesor',
  shape: [
    'email',
    'password'
  ]
}

export const Group = {
  name: 'grupo',
  shape: [
    'name',
    'description',
    'profeId'
  ]
}

export const Student = {
  name: 'estudiante',
  shape: [
    'name',
    'lastName',
    'email',
    'password',
    'groupIds'
  ]
}