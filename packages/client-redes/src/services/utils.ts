
export const encodeText = input => encodeURIComponent(input)

export const whatsappText = ({ volunteer_name, individual_name, agent, isVolunteer }) => {
  if (isVolunteer) return `*${volunteer_name}, DEU MATCH* 🤝🏽 O seu número de atendimento acaba de ser enviado para a ${individual_name}! Esperamos que  ela entre em contato com você. Infelizmente, sabemos o quão difícil é dar esse passo e pode ser que ela não a procure. Ela possui 30 dias para entrar em contato, caso isso não aconteça dentro desse período, liberaremos a vaga para outra mulher. \n\n*Não se esqueça de nos avisar quando começar a atendê-la. Lembre que os atendimentos devem ser integralmente gratuitos.* \n\n Para te auxiliar, acesse a nossa cartilha com informações fundamentais sobre o acolhimento a mulheres em situação de violência. Acabamos de enviá-la por e-mail. \n\n Qualquer dúvida ou dificuldade, por favor nos comunique. \n Obrigada! É muito bom saber que podemos contar com você 💜\n Um abraço, \n ${agent} do Mapa do Acolhimento.`
  return `*${volunteer_name}, DEU MATCH* 🤝🏽 O seu número de atendimento acaba de ser enviado para a ${individual_name}! Esperamos que  ela entre em contato com você. Infelizmente, sabemos o quão difícil é dar esse passo e pode ser que ela não a procure. Ela possui 30 dias para entrar em contato, caso isso não aconteça dentro desse período, liberaremos a vaga para outra mulher. \n\n*Não se esqueça de nos avisar quando começar a atendê-la. Lembre que os atendimentos devem ser integralmente gratuitos.* \n\n Para te auxiliar, acesse a nossa cartilha com informações fundamentais sobre o acolhimento a mulheres em situação de violência. Acabamos de enviá-la por e-mail. \n\n Qualquer dúvida ou dificuldade, por favor nos comunique. \n Obrigada! É muito bom saber que podemos contar com você 💜\n Um abraço, \n ${agent} do Mapa do Acolhimento.`
}

export const parseNumber = input => input.replace(/\D/g, '')

export const emailValidation = () => (
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
)