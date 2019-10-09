import axios from 'axios'
import dbg from './dbg'
import User from '../interfaces/User'
import { HasuraResponse, isError } from '../interfaces/HasuraResponse'

const log = dbg.extend('getUserFromTicket')

const query = `query ($id: bigint) {
  solidarity_users(where: {
    user_id: {
      _eq: $id
    }
  }) {
    user_id
    name
    atendimentos_concludos_calculado_
    atendimentos_em_andamento_calculado_
    encaminhamentos_realizados_calculado_
    disponibilidade_de_atendimentos
    latitude
    longitude
    condition
    tipo_de_acolhimento
    organization_id
  }
}`

export type UserFromTicket = Pick<User, 'user_id' | 'atendimentos_concludos_calculado_' | 'atendimentos_em_andamento_calculado_' | 'encaminhamentos_realizados_calculado_' | 'disponibilidade_de_atendimentos' | 'latitude' | 'longitude' | 'condition' | 'tipo_de_acolhimento' | 'organization_id' | 'name'>

const getUserFromTicket = async (id: number) => {
  const { HASURA_API_URL, X_HASURA_ADMIN_SECRET } = process.env
  const response = await axios.post<HasuraResponse<'solidarity_users', UserFromTicket[]>>(HASURA_API_URL, {
    query,
    variables: { id }
  }, {
    headers: {
      'x-hasura-admin-secret': X_HASURA_ADMIN_SECRET
    }
  })

  if (isError(response.data)) {
    return log(response.data.errors)
  }

  return response.data.data.solidarity_users
}

export default getUserFromTicket
