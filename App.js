'use strict';
import React, {useState, useEffect, useRef, useReducer, useMemo} from 'react';
import {View, Dimensions, Animated, Text, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {parse} from '@babel/core';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/home/HomeScreen';
import LoginPage from './components/login/LoginPage';
import SignUpPage from './components/login/SignUpPage';
import SetPasswordPage from './components/login/SetPasswordPage';
import {AuthContext} from './components/login/context';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']);

import Config from './Config.json';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    console.log(state.userToken);
  }, [state.userToken]);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let res = await fetch(Config.SERVER_URL + '/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({email: data.username, password: data.password}),
        });
        let result = await res.json();

        dispatch({type: 'SIGN_IN', token: result.auth_token});
      },

      signOut: async () => {
        console.log(state.userToken);

        let res = await fetch(Config.SERVER_URL + '/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + state.userToken,
          },
        });

        let result = await res.json();
        console.log(result);

        dispatch({type: 'SIGN_OUT'})
      },

      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        let res = await fetch(Config.SERVER_URL + '/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({email: data.username, password: data.password}),
        });
        let result = await res.json();
        dispatch({type: 'SIGN_IN', token: result.auth_token});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {state.userToken != null ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{
                  // When logging out, a pop animation feels intuitive
                  // You can remove this if you want the default 'push' animation
                  animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
              />
              <Stack.Screen name="SignUp" component={SignUpPage} />
              <Stack.Screen name="SetPassword" component={SetPasswordPage} />
            </>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
