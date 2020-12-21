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