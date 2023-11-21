import { Auth } from "../../src/types/Auth"
import { User } from "../../src/types/User"

export const validBodyLogin: Auth = {
  username: 'user@mail.com',
  password: 'chang3m3'
}

export const UserFromDb:User = {
  id: 1,
  username: 'xablau',
 level: 5,
  vocation: 'xablau',
  password: '$2a$10$iGXLqZAg5bscG6flpiwgbugpR.G8OCiAObU278PH96VgR8CyyGJuK' // chang3m3
}