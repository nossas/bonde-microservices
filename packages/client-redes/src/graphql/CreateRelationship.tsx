import { gql } from "apollo-boost";

export default gql`
  mutation createRelationship($input: [rede_relationships_insert_input!]!, $update: [rede_individuals_bool_exp]) {
    insert_rede_relationships(
      objects: $input
    ) {
      returning {
        created_at
        id
        recipient_id
        updated_at
        agent {
          id
        }
      }
    }

    update_rede_individuals(
      _set: { availability: "indisponível" }
      where: {
        _or: $update
      }
    ) {
      returning {
        id
        email
        availability
      }
    }
  }
`;
