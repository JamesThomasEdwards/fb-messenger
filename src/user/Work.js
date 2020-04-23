import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";


const WORK_FRAGMENT = gql`
  fragment UpdateWorkForm on Work {
      id
    company
  }
`;

export const WORK_QUERY_FRAGMENT = gql`
   fragment WorkQuery on User {
     work {
       ...UpdateWorkForm
     }
   }
   ${ WORK_FRAGMENT }
`

// const WORK = gql`
//   query work ($userId: ID!){
//     work(userId: $userId) {
//       ...UpdateWorkForm
//     }
//   }
//   ${ WORK_FRAGMENT }
// `;

const UPDATE_WORK_MUTATION = gql`
  mutation updateWork($work:UpdateWorkInput!) {
    updateWork(work:$work) {
      work {
        ...UpdateWorkForm
      }
    }
  }
  ${ WORK_FRAGMENT }
`;

const Work = ({ user }) => {
  const [company, setCompany] = useState("");
  // const { data, loading, error } = useQuery(WORK, { variables: { userId }});
  const [ mutateWork, { loading: updatingWork, error: errorOnUpdatingWork } ] = useMutation(UPDATE_WORK_MUTATION);
  
  const updateWork = (e) => {
    e.preventDefault();
    mutateWork({ 
      variables: { 
        work: { userId: user.id, company }
      }
    });
  };

  // if (error) {
  //   return <h2>{error.message}</h2>;
  // } else if (loading) {
  //   return <h2>Loading...</h2>;
  // }

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
            value={company || user.work.company}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </React.Fragment>
  );
};

export default Work;
