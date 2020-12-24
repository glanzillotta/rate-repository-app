import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import * as Linking from 'expo-linking';


import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
    siteButton: {
        backgroundColor: theme.colors.primary,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.colors.textPrimary,
        borderRadius: 3,
        padding: 10,
        margin: 10,
    },
    cardButton: {
        backgroundColor: theme.colors.backgroundCard,
    }
});

const Repository = () => {
    const { id } = useParams();
    console.log('id: ', id);
    const { data } = useQuery(GET_REPOSITORY, {
        variables: { id },
    });
    console.log('data: ', data);

    if (!data) return null;

    return (
        <View style={styles.cardButton}>
            <RepositoryItem item={data.repository} />
            <TouchableOpacity onPress={() => Linking.openURL(data.repository.url)}>
                <Text style={styles.siteButton}>Open in GitHub</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Repository;