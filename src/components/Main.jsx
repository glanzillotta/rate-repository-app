import React from 'react';
import { StyleSheet, View } from 'react-native';

import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar/AppBar';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor:theme.colors.backgroundMain
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <RepositoryList />
    </View>
  );
};

export default Main;