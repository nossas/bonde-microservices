import React from 'react'
import PropTypes from 'prop-types'
import {
  Title,
  Text,
  Button,
  Link,
  Loading
} from 'bonde-styleguide'

import { If } from '../If'
import {
  StyledFlexbox,
  StyledModal,
  StyledLink,
  ErrorWrapper,
  Box
} from './styles'

const Popup = ({ confirm, success, error, warning, isOpen, onClose, volunteerName, individualName, isLoading }) => {
  return (
    <StyledModal
      opened={isOpen}
      onClose={onClose}
      width={20}
    >
      <StyledFlexbox middle vertical spacing="evenly">
        <If condition={isLoading}>
          <Loading />
        </If>
        <If condition={confirm.isEnabled}>
          {Confirm({ ...confirm, volunteerName, individualName })}
        </If>
        <If condition={success.isEnabled}>
          {Success({ ...success, volunteerName, individualName })}
        </If>
        <If condition={error.isEnabled}>
          {Error({ ...error, volunteerName, individualName })}
        </If>
        <If condition={warning.isEnabled}>
          {Warning({ ...warning })}
        </If>
      </StyledFlexbox>
  </StyledModal>
  )
}

const Warning = ({ name, id }) => (
  <>
    <Title.H2>Ops!</Title.H2>
    <Text align="center">
      Telefone Inválido ):
    </Text>
    <Text align="center">
      A voluntária{' '}
      <Link
        href={`https://mapadoacolhimento.zendesk.com/agent/users/${id}/requested_tickets`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </Link> 
      {' '}não possui número de Whastapp
    </Text>
  </>
)

const Confirm = ({ individualName, volunteerName, onClose, onSubmit }) => (
  <>
    <Title.H2>Confirma?</Title.H2>
    <Text align="center">
      {individualName} será encaminhada para {volunteerName}
    </Text>
    <Button onClick={onSubmit}>confirmar encaminhamento</Button>
    <StyledLink onClick={onClose}>voltar para o match</StyledLink>
  </>
)

const Success = ({ individualName, volunteerName, onClose, link, ticketId }) => (
  <>
    <Title.H2 align="center">Encaminhamento Realizado</Title.H2>
    <Text align="center">
      EBA! {individualName} foi encaminhada para {volunteerName}.
    </Text>
    <Link
      href={`https://mapadoacolhimento.zendesk.com/agent/tickets/${ticketId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Acesse o ticket do match
    </Link>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button>enviar whats para voluntária</Button>
    </a>
    <StyledLink onClick={onClose}>fazer nova busca</StyledLink>
  </>
)

const Error = ({ individualName, volunteerName, onClose, onSubmit, message }) => (
  <ErrorWrapper vertical>
    <Title.H2>Ops!</Title.H2>
    <Text align="center">
      Encontramos um erro e {individualName} não pôde ser encaminhada para {volunteerName}
    </Text>
    <Text align="center">Clique abaixo para tentar outra vez. Se o erro persistir, comunique o time de tech.</Text>
    <Box middle>
      <Text>{message}</Text>
    </Box>
    <Button onClick={onSubmit}>encaminhar novamente</Button>
    <StyledLink onClick={onClose}>voltar para o match</StyledLink>
  </ErrorWrapper>
)

Popup.propTypes = {
  confirm: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool.isRequired
  }),
  success: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    link: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    ticketId: PropTypes.number.isRequired
  }),
  error: PropTypes.shape({
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  volunteerName: PropTypes.string.isRequired,
  individualName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

Popup.defaultProps = {
  isOpen: false
}

export default Popup