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
query getRepository($orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection, $searchKeyword:String){
    repositories(orderBy:$orderBy,orderDirection:$orderDirection, searchKeyword:$searchKeyword){
    edges{
      node{
        ...RepositoryDetail
        }
      }
    }
}

${REPOSITORY}
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