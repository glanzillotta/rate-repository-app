import React,{ useState} from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { Button, Menu } from 'react-native-paper';

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

    const onPress = (value) =>{
        setOrder(value)
        closeMenu()
    }

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
                <Menu.Item onPress={()=>onPress({ orderBy: 'CREATED_AT', orderDirection: 'DESC' })} title="Latest repositories" />
                <Menu.Item onPress={()=>onPress({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })} title="Highest rated repositories" />
                <Menu.Item onPress={()=>onPress({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })} title="Lowest rated repositories" />
            </Menu>
        </View>
    );
};

export const RepositoryListContainer = ({ repositories, setOrder }) => {
  
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];
    const history = useHistory();

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={item => item.id}
            ListHeaderComponent={<DropdownSort setOrder={setOrder} />}
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
    const { repositories} = useRepositories(order);

    return <RepositoryListContainer repositories={repositories} setOrder={setOrder} />;
};

export default RepositoryList;