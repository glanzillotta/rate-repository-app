import { gql } from 'apollo-boost';

export const GET_TOKEN = gql`
    mutation AuthorizationToken($username:String!, $password:String!) {
        authorize(credentials:{username:$username, password:$password }){
            accessToken
        }
   }
`;

export const POST_REVIEW= gql`
mutation ReviewPost($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String){
  createReview( review:{repositoryName:$repositoryName, ownerName:$ownerName, rating:$rating, text:$text}){
      id
  }
}
`;

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!){
  createUser(user:{username:$username, password:$password}){
    id
  }
}
`;

