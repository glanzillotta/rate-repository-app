import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import Repository from './Repository';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundMain,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repositories/:id" exact component={Repository} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/" exact component={RepositoryList} />
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;