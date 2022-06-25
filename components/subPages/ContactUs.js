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
import {ScrollView} from 'r5eact-native-gesture-handler';
import MultilineTextInput from '../common/MultilineTextInput';

import Config from '../../Config.json';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const ContactUs = ({display}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(global.email);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [emailBorder, setEmailBorder] = useState('#05F2BC');
  const [messageBorder, setMessageBorder] = useState('#05F2BC');

  const sendContactMessage = async () => {
    let res = await fetch(Config.SERVER_URL + '/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        message: message,
      }),
    });
  };

  return (
    <View style={[styles.container]} display={display}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.boxTitle}>Name</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.boxTitle}>Email</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.boxTitle}>Phone Number</Text>
      <TextInput style={styles.textInput}></TextInput>
      <Text style={styles.boxTitle}>Message</Text>
      <MultilineTextInput 
        value={message}
        onChangeText={text => setMessage(text)}
        style={styles.feedbackInput}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: '100%',
    marginTop: '50rem',
    marginLeft: '-61rem',
    alignItems: 'center',
  },
  title: {
    fontSize: '22rem',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    paddingBottom: '40rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  boxTitle: {
    color: 'black',
    fontSize: '12rem',
    width: '100%',
    textAlign: 'left',
    marginLeft: '75rem',
    marginBottom: '5rem',
    fontFamily: 'Montserrat-SemiBold',
    opacity: 0.5,
  },
  cardBtn: {
    width: '100%',
    height: '55rem',
    backgroundColor: 'white',
    borderColor: '#C5C5C5',
    borderTopWidth: '0.5rem',
    borderBottomWidth: '0.5rem',
    marginTop: '10rem',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: '15rem',
    width: '100%',
    textAlign: 'left',
    marginLeft: '70rem',
    fontFamily: 'Montserrat-Medium',
  },
  textInput: {
    width: '85%',
    height: '40rem',
    color: 'black',
    fontSize: '14rem',
    fontFamily: 'Montserrat-Medium',
    backgroundColor: 'white',
    borderColor: '#00EBB6',
    borderWidth: '0.5rem',
    borderRadius: '10rem',
    marginBottom: '25rem',
    padding: '10rem',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  feedbackInput: {
    width: '85%',
    color: 'black',
    fontSize: '14rem',
    fontFamily: 'Montserrat-Medium',
    borderColor: '#00EBB6',
    borderWidth: '0.5rem',
    borderRadius: '10rem',
    padding: '10rem',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
});

export default ContactUs;
