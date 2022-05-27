'use strict';
import React, {useState, useContext} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {AuthContext} from './context';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const LoginPage = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kook</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>email / phone number</Text>
      </View>
      <TextInput
        value={username}
        autoCapitalize="none"
        onChangeText={setUsername}
        style={styles.textInput}></TextInput>
      <View style={styles.textContainer}>
        <Text style={styles.text}>password</Text>
      </View>
      <TextInput
        value={password}
        autoCapitalize="none"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}></TextInput>
      <TouchableOpacity
        onPress={() => {
          signIn({username, password});
        }}
        style={styles.btn}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.signUpBtn}>
        <Text style={styles.signUpTxt}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: '150rem',
    marginBottom: '20rem',
  },
  title: {
    color: '#05F2BC',
    fontSize: '70rem',
    fontFamily: 'Montserrat-Bold',
  },
  textContainer: {
    alignSelf: 'stretch',
    left: '63rem',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '20rem',
    marginBottom: '10rem',
  },
  text: {
    color: 'black',
    fontSize: '16rem',
    fontFamily: 'Montserrat-Medium',
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderColor: '#05F2BC',
    borderWidth: '2rem',
    width: '280rem',
    height: '50rem',
    borderRadius: '2rem',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: '10rem',
  },
  btn: {
    width: '220rem',
    aspectRatio: 4,
    backgroundColor: '#00EBB6',
    shadowOffset: {width: 0, height: '-2rem'},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    borderRadius: '8rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '35rem',
    marginBottom: '25rem',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: '26rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  signUpBtn: {
    marginBottom: '280rem',
  },
  signUpTxt: {
    color: '#00EBB6',
    fontSize: '18rem',
    fontFamily: 'Montserrat-Medium',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
