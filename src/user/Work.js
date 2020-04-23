import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const WORK = gql`
  query work ($userId: ID!){
  work(userId: $userId) {
    company
  }
  }
`;
const Work = ({ userId }) => {
  const [company, setCompany] = useState("");
  const { data, loading, error } = useQuery(WORK, { variables: { userId }});

  const updateWork = (e) => {
    e.preventDefault();

    // 🚧 you'll invoke a mutation here
  };

  if (error) {
    return <h2>{error.message}</h2>;
  } else if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <React.Fragment>
      <br />
      <h2>Work</h2>
      <form onSubmit={updateWork}>
        <label>
          Company
          <input
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            value={company || data.work.company}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </React.Fragment>
  );
};

export default Work;
