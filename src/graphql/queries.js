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
  repository{
    name
    id
  }
  user {
    id
    username
  }
}
`;

export const PAGE_INFO = gql`
fragment PageInfoDetail on PageInfo {
  endCursor
  startCursor
  totalCount
  hasNextPage
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

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false, $first:Int, $after: String) {
    authorizedUser {
      id
      username
      reviews(first:$first, after:$after) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetail
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetail
        }
      }
    }
  }

${REVIEW}
${PAGE_INFO}
`;

export const GET_REPOSITORY = gql`
query getRepository($id:ID!, $first:Int, $after:String){
    repository(id: $id) {
      ...RepositoryDetail
      url
    reviews(first: $first, after:$after){
      edges {
        node {
          ...ReviewDetail
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetail
      }
    }
  }
}

${PAGE_INFO}
${REVIEW},
${REPOSITORY}
`;