import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SmartClient, WeakClient, services } from 'zetapush-js';

const sandboxId = '';
const email = 'imth';
const password = 'azerty';

export default class App extends Component {
  onPressCreateUser = () => {
    const client = new WeakClient({ sandboxId });
    client.connect();

    client.onSuccessfulHandshake(() => {
      client
        .createService({
          Type: services.Macro,
          listener: {
            createUser({ data }) {
              if (data.errors.length) {
                console.warn(data.errors[0].code);
              } else {
                console.warn("User created");
              }
            },
          },
        })
        .call({
          name: 'createUser',
          parameters: {
            login: email,
            password,
            fields: {
              email,
              firstName: 'Immersive',
              lastName: 'Therapy',
              addressLine1: 'imth',
              zipCode: '35000',
              city: 'Rennes',
              country: 'France',
            },
          },
        });
    });
  }

  onPressConnect = () => {
    const client = new SmartClient({ sandboxId });
    client.setCredentials({ login: email, password });
    client.connect();

    client.onFailedHandshake(data => {
      console.warn(data);
    });

    client.onSuccessfulHandshake((data) => {
      console.warn('IT WORKS!!!', data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressCreateUser} style={styles.button}>
          <Text style={styles.text}>CREATE USER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressConnect} style={styles.button}>
          <Text style={styles.text}>CONNECT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 15,
    width: '50%',
    backgroundColor: 'purple',
    padding: 7.5,
    borderRadius: 25,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
});
