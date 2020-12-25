import { gql } from 'apollo-boost';

export const REPOSITORY = gql`
fragment RepositoryDetail on  Repository { 
    id,
    ownerAvatarUrl,
    fullName,
    description,
    language,
    forksCount,
    reviewCount,
    ratingAverage,
    stargazersCount
}
`;

export const GET_REPOSITORIES = gql`
query {
    repositories{
    edges{
      node{
        ...RepositoryDetail
        }
      }
    }
}

${REPOSITORY}
`;

export const GET_TOKEN = gql`
    mutation AuthorizationToken($username:String!, $password:String!) {
        authorize(credentials:{username:$username, password:$password }){
            accessToken
        }
\   }
`;

export const AUTHORIZED = gql`
query{
    authorizedUser {
    id
    username
  }
}
`;

export const GET_REPOSITORY = gql`
query getRepository($id:ID!){
    repository(id: $id) {
      ...RepositoryDetail
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
  }
}
}

${REPOSITORY}
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