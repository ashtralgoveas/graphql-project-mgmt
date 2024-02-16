import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      email
      name
      phone
    }
  }
`;

const GET_CLIENT = gql`
  query getClient($id: ID!) {
    client(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CLIENTS, GET_CLIENT };
