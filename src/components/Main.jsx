import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import theme from '../theme';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import Review from './Review';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

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
        <Route path="/SignUp" exact component={SignUp} />
        <Route path="/user/reviews" exact component={UserReviews} />
        <Route path="/review" exact component={Review} />
        <Route path="/repositories/:id" exact component={SingleRepository} />
        <Route path="/SignIn" exact component={SignIn} />
        <Route path="/" exact component={RepositoryList} />
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;