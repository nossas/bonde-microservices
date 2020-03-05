import React, {
  useCallback,
  Fragment,
  useState,
  useEffect
} from 'react'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import * as turf from '@turf/turf'
import { useHistory, useLocation } from 'react-router-dom'
import { Flexbox2 as Flexbox, Title, Spacing } from 'bonde-styleguide'
import { useMutation } from '@apollo/react-hooks'

import { Wrap, StyledButton } from './style'
import columns from './columns'
import FetchUsersByGroup from '../../graphql/FetchUsersByGroup'
import CREATE_RELATIONSHIP from '../../graphql/CreateRelationship'
import useAppLogic from '../../app-logic'
import { getQuery } from '../../services/utils'
import { SessionHOC } from '../../services/session/SessionProvider'

import { If } from '../../components/If'
import Popup from '../../components/Popups/Popup'

interface Popups {
  confirm: boolean
  wrapper: boolean
  noPhoneNumber: boolean
}

const Table = SessionHOC(({ session: { user: agent } }: any) => {
  const [createConnection, { data, loading, error }] = useMutation(CREATE_RELATIONSHIP);
  const {
    individual,
    volunteer,
    popups,
    createWhatsappLink,
    parsedIndividualNumber,
    urlencodedIndividualText,
    parsedVolunteerNumber,
    urlencodedVolunteerText,
    getUserData,
    lat,
    lng,
    distance,
    setTable,
    setVolunteer,
    setPopup
  } = useAppLogic()

  const { goBack } = useHistory()
  const { search } = useLocation()

  const [success, setSuccess] = useState(false);
  const [fail, setError] = useState(false);
  const [isLoading, setLoader] = useState(false);;

  const { confirm, wrapper, noPhoneNumber } = popups;
  const { first_name: individual_name, id: individual_user_id } = individual;
  const {
    first_name: volunteer_name,
    whatsapp: volunteer_whatsapp,
    id: volunteer_user_id,
  } = volunteer;

  useEffect(() => {
    setLoader(loading)
    setError(!!(error && error.message))
    if (data) setSuccess(true)
  }, [setLoader, loading, error, setError, data])

  const filterByDistance = useCallback(
    data =>
      data
        .map(i => {
          const pointA = [Number(i.latitude), Number(i.longitude)];

          return {
            ...i,
            distance:
              !Number.isNaN(pointA[0]) &&
              !Number.isNaN(pointA[1]) &&
              lat &&
              lng &&
              Number(turf.distance([lat, lng], pointA)).toFixed(2)
          };
        })
        .filter(i => {
          if (!lat || !lng) {
            return true;
          }
          return i.distance && Number(i.distance) < distance;
        })
        .sort((a, b) => Number(a.distance) - Number(b.distance)),
    [distance, lat, lng]
  );

  // const filterByCategory = useCallback(
  //   data =>
  //     data.filter(
  //       i => i.tipo_de_acolhimento === selectedCategory
  //     ),
  //   // eslint-disable-next-line
  //   [volunteer_organization_id]
  // );

  const onConfirm = () => {
    if (!volunteer_whatsapp)
      return setPopup({
        ...popups,
        noPhoneNumber: true,
        confirm: false
      });
    setPopup({ ...popups, confirm: false });
    return createConnection({ 
      variables: {
        recipientId: individual_user_id,
        volunteerId: volunteer_user_id,
        agent: agent.id
      }
    })
  };

  const closeAllPopups = () => {
    setSuccess(false);
    setPopup({
      wrapper: false,
      confirm: false
    });
    return goBack()
  }

  return (
    <FetchUsersByGroup>
      {({ individuals, volunteers }) => {
        console.log({volunteer})
        const filteredTableData = filterByDistance(
          individuals.data  
        )
        setTable(individuals.data)
        // Busca na url qual id da voluntária
        const user = getUserData({
          user: getQuery(search),
          data: volunteers.data,
          filterBy: "id"
        })
        // Seta a voluntária
        setVolunteer(user)
        return individuals.data.length === 0 ? (
          <Flexbox middle>
            <Wrap>
              <Title.H3 margin={{ bottom: 30 }}>Nenhum resultado.</Title.H3>
            </Wrap>
          </Flexbox>
        ) : (
          <Fragment>
            <Flexbox vertical middle>
              <Wrap>
                <Flexbox vertical>
                  <Spacing margin={{ bottom: 20}}>
                    <Flexbox>
                      <StyledButton flat onClick={goBack}>{'< fazer match'}</StyledButton>
                    </Flexbox>
                    <Spacing margin={{ top: 10, bottom: 10 }}>
                      <Title.H3>Match realizado!</Title.H3>
                    </Spacing>
                    <Title.H5 color="#444444">
                      {`${filteredTableData.length} solicitações de PSRs próximas de ${volunteer_name}`}
                    </Title.H5>
                  </Spacing>
                </Flexbox>
                <ReactTable
                  data={filteredTableData}
                  columns={columns}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </Wrap>
            </Flexbox>
            <If condition={wrapper}>
              <Popup
                individualName={individual_name}
                volunteerName={volunteer_name}
                onSubmit={onConfirm}
                isOpen={wrapper}
                onClose={closeAllPopups}
                isLoading={isLoading}
                confirm={{ isEnabled: confirm }}
                success={{
                  link: {
                    individual: () => createWhatsappLink(parsedIndividualNumber, urlencodedIndividualText),
                    volunteer: () => createWhatsappLink(parsedVolunteerNumber, urlencodedVolunteerText)
                  },
                  isEnabled: success
                }}
                error={{
                  isEnabled: fail,
                  message: (error && error.message) || ''
                }}
                warning={{
                  isEnabled: noPhoneNumber,
                  id: volunteer_user_id,
                  name: volunteer_name
                }}
              />
            </If>
          </Fragment>
        );
      }}
    </FetchUsersByGroup>
  )
})

export default Table;