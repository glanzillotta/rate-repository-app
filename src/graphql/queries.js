import { gql } from 'apollo-boost';

export const REPOSITORY = gql`
fragment RepositoryDetail on  Repository { 
  id
  ownerAvatarUrl
  fullName
  description
  language
  forksCount
  reviewCount
  ratingAverage
  stargazersCount
}
`;

export const REVIEW = gql`
fragment ReviewDetail on  Review { 
  id
  text
  rating
  createdAt
  user {
    id
    username
  }
}
`;

export const GET_REPOSITORIES = gql`
query getRepositories($orderBy:AllRepositoriesOrderBy, $orderDirection:OrderDirection, $searchKeyword:String){
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
query getRepository($id:ID!, $first:Int, $after:String){
    repository(id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      forksCount
      reviewCount
      ratingAverage
      stargazersCount
      url
    reviews(first: $first, after:$after){
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;