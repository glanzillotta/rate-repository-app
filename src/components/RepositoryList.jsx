import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    const history = useHistory();

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => history.push(`/repositories/${item.id}`)}>
                        <RepositoryItem item={item} />
                    </TouchableOpacity>
                );
            }}
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;