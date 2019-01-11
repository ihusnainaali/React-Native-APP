import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

import * as actions from '../actions';

class AuthScreen extends Component {
  state = {
    isSignedIn: false,
  }

  componentDidMount() {
    this.onAuthComplete(this.props);
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   this.onAuthComplete(nextProps);
  // }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Main');
    }
  }

  fbLoginPress = () => {
    this.props.fbLogin(() => {
      this.props.navigation.navigate('Main');
    });
  }

  render() {
    return (
      <View style={styles.containerViewStyle}>
        <Text style={styles.logoTextStyle}>Pijns</Text>
        <Button
          title="Login with Facebook"
          onPress={this.fbLoginPress}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#03A9F4'
  },
  logoTextStyle: {
    fontFamily: 'coiny',
    fontSize: 32,
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#158cdb',
    borderRadius: 25
  }
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
