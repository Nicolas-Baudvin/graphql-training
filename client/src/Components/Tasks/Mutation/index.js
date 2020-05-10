import gql from "graphql-tag";

export const ADD_TASK = gql`
    mutation ($title: String!, $isChecked: Boolean!, $userID: String!) {
      taskCreateOne(record: {
        title: $title,
        isChecked: $isChecked,
        userID: $userID
      }) {
        record {
          title,
          isChecked,
          userID,
          _id
        }
      }
    }
`;