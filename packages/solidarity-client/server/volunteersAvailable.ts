import getSolidarityUsers from './hasura/getSolidarityUsers'
import getSolidarityMatches from './hasura/getSolidarityMatches'
import { zendeskOrganizations } from './parse/index'

const main = async (req, res, next) => {
  const INDIVIDUAL = zendeskOrganizations.individual
  const volunteersAvailability = await getSolidarityUsers({
    query: `query ($individual_id: bigint!){
      solidarity_users(
        where: {
          condition: {_eq: "disponivel"},
          longitude: {_is_null: false},
          latitude: {_is_null: false},
          _and: [
            {organization_id: {_neq: $individual_id }},
            {organization_id: {_is_null: false }}
          ]
        }
      ) {
        user_id
        disponibilidade_de_atendimentos
        atendimentos_em_andamento_calculado_
        email
        name
        organization_id
        latitude
        longitude
        whatsapp
        phone
        registration_number
        id
      }
    }`,
    variables: {
      individual_id: INDIVIDUAL
    }
  })

  const today = new Date()
  // get last month and format
  const last_month = new Date().setDate((today.getDate() - 30)) 
  // format last_month timestamp
  const timestamp = new Date(last_month).toISOString()
  const pendingTickets = await getSolidarityMatches({
    query: `query ($last_month: timestamp!){
      solidarity_matches(
        order_by: {created_at: desc}
        where: {
          created_at: {_lte: $last_month},
          status: {_eq: "encaminhamento__realizado"}
        }
      ) {
        volunteers_user_id,
        volunteers_ticket_id
        id
      }
    }`,
    variables: {
      last_month: timestamp
    }
  })

  // only approved volunteers are available?
  const availableVolunteers = volunteersAvailability
    .map(user => {
      const {
        disponibilidade_de_atendimentos,
        atendimentos_em_andamento_calculado_,
        user_id
      } = user
      const formatAvailability = disponibilidade_de_atendimentos !== '5_ou_mais'
        ? Number(disponibilidade_de_atendimentos)
        : 5
      const forwardings_last_30_days = pendingTickets.filter(ticket => ticket.volunteers_user_id === user_id)
      const countForwardings = forwardings_last_30_days.length
      const availability = formatAvailability - (countForwardings + atendimentos_em_andamento_calculado_)

      return {
        ...user,
        pending: countForwardings,
        availability
      }
    })
  .filter(user => user.availability > 0)

  res.json(availableVolunteers)
}

export default main
