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
  }
}

${REPOSITORY}
`;