'use strict';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const SignUpPage = ({navigation}) => {
  const [username, setUsername] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.backBtnContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
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
        <Text style={styles.text}>enter verification code</Text>
      </View>
      <View style={styles.verificationBox}>
        <TextInput style={styles.textInput} autoCapitalize="none"></TextInput>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SetPassword', {username: {username}})
          }
          style={styles.btn}>
          <Text style={styles.btnText}>Send{'\n'}Code</Text>
        </TouchableOpacity>
      </View>
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
  backBtnContainer: {
    alignSelf: 'stretch',
  },
  backBtn: {
    alignSelf: 'stretch',
    marginTop: '45rem',
    left: '30rem',
  },
  backBtnText: {
    color: 'black',
    fontSize: '20rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  titleContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '100rem',
    marginBottom: '40rem',
  },
  title: {
    color: 'black',
    fontSize: '35rem',
    fontFamily: 'Montserrat-Bold',
    left: '55rem',
  },
  textContainer: {
    alignSelf: 'stretch',
    left: '63rem',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '10rem',
    marginTop: '20rem',
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
    height: '50rem',
    aspectRatio: 2,
    backgroundColor: '#00EBB6',
    shadowOffset: {width: 0, height: '-2rem'},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    borderRadius: '2rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-50rem',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: '18rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  verificationBox: {
    alignItems: 'flex-end',
    marginBottom: '400rem',
    justifyContent: 'flex-start',
  },
});

export default SignUpPage;
