import { getSolidarityUsers } from "../hasura";

const main = async (req, res, _next) => {
  const locations = await getSolidarityUsers({
    query: `query ($id: bigint!){
      solidarity_users(
        where: {
          user_id: {_eq: $id},
        }
      ) {
        user_id
        email
        name
        organization_id
        latitude
        longitude
        data_de_inscricao_no_bonde
        condition
        id
      }
    }`,
    variables: {
      id: req.query.id
    }
  });

  res.json(locations);
};

export default main;
