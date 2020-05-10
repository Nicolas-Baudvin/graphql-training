import gql from "graphql-tag";

export const GET_USER_TASKS = gql`
    query ($userID: String!) {
      taskMany(filter: {
        userID: $userID
      }) {
        title,
        userID,
        _id,
        isChecked
      }
    }
`;