import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { StyledPage } from "./styles";
import AboutWork from "./Work";
import { WORK_QUERY_FRAGMENT } from "./Work"

export const USER_FRAGMENT = gql`
  fragment UpdateUserForm on User {
    id
    fullname
    username
  }
`;

export const VIEWER = gql`
  query {
    viewer {
      ...UpdateUserForm
        ...WorkQuery
    }
  }
  ${ USER_FRAGMENT }
  ${ WORK_QUERY_FRAGMENT }
`;

const UPADTE_USER_MUTATION = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user:$user) {
      user{
        ...UpdateUserForm
      }
    }
  }
  ${ USER_FRAGMENT }
`;

const Profile = () => {
  const [fullname, setFullname] = useState("");
  const { data, loading, error } = useQuery(VIEWER);
  const [ mutateUser, {loading: updatingUser, error: errorOnUpdatingUser} ] = useMutation(UPADTE_USER_MUTATION);


  const updateUser = (e) => {
    e.preventDefault();
    mutateUser({ variables: { user: { id: data.viewer.id, fullname } }});
    // 🚧 you'll invoke a mutation here
  };

  if (error) {
    return <h2>{error.message}</h2>;
  } else if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <StyledPage>
      <div>
        <h2>Profile</h2>
        <img alt="clone" src="/images/clone.jpg" />
        <form onSubmit={updateUser}>
          <label>
            Fullname
            <input
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              value={fullname || data.viewer.fullname}
            />
          </label>
          <button type="submit">Save</button>
        </form>
        <hr />
        <AboutWork user={data.viewer} />
      </div>
    </StyledPage>
  );
};

export default Profile;
