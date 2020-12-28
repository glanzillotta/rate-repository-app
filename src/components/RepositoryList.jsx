import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button, Menu, Searchbar } from 'react-native-paper';
import _ from 'lodash';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const DropdownSort = ({ setOrder }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const onPress = (value) => {
        setOrder(value);
        closeMenu();
    };

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Button onPress={openMenu}>Ordered by</Button>}>
                <Menu.Item onPress={() => onPress({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })} title="Latest repositories" />
                <Menu.Item onPress={() => onPress({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })} title="Highest rated repositories" />
                <Menu.Item onPress={() => onPress({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })} title="Lowest rated repositories" />
            </Menu>
        </View>
    );
};

const Search = ({ setSearchKeyword }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        setSearchKeyword(query);
    };

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};

const ListHeader = ({ setOrder, setSearchKeyword }) => {
    return (
        <View>
            <Search setSearchKeyword={setSearchKeyword} />
            <DropdownSort setOrder={setOrder} />
        </View>
    );
};


export const RepositoryListContainer = ({ repositories, setOrder, setSearchKeyword }) => {

    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    const history = useHistory();

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            ListHeaderComponent={<ListHeader setOrder={setOrder} setSearchKeyword={setSearchKeyword} />}
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
    const [order, setOrder] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const { repositories } = useRepositories(order, searchKeyword);
    console.log('searchKeyword: ', searchKeyword);
    _.debounce(setSearchKeyword, 500);

    return <RepositoryListContainer repositories={repositories} setOrder={setOrder} setSearchKeyword={setSearchKeyword} />;
};

export default RepositoryList;