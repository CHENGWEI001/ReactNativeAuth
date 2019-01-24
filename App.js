import React from 'react';
import { View, Text } from 'react-native';
import { Header, Button, CardSection, Spinner } from './src/components/common';
import firebase from 'firebase';
import LoginForm from './src/components/LoginForm';

// create component
class App extends React.Component {
  state = { loggedIn: null };

  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyAEbGn4gKQM_WdmQyjrdzmP1H4z5dx2gog',
        authDomain: 'auth-7d035.firebaseapp.com',
        databaseURL: 'https://auth-7d035.firebaseio.com',
        projectId: 'auth-7d035',
        storageBucket: 'auth-7d035.appspot.com',
        messagingSenderId: '527798819040',
      });
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large"/>
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

// render it to the device
// AppRegistry.registerComponent('albums', () => App);
export default App;
