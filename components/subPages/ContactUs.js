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

const ContactUs = ({display, changeSubpage}) => {
  const [name, setName] = useState('');
  // TODO: set user email as default
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [nameBorder, setNameBorder] = useState('#00EBB6');
  const [phoneBorder, setPhoneBorder] = useState('#00EBB6');
  const [emailBorder, setEmailBorder] = useState('#00EBB6');
  const [messageBorder, setMessageBorder] = useState('#00EBB6');

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

  const checkInfoVaild = () => {
    let valid = true;
    if (name.length == 0) {
      setNameBorder('#ED474A');
      valid = false;
    }
    if (email.length == 0) {
      setEmailBorder('#ED474A');
      valid = false;
    }
    if (phone.length == 0) {
      setPhoneBorder('#ED474A');
      valid = false;
    }
    if (message.length == 0) {
      setMessageBorder('#ED474A');
      valid = false;
    }
    return valid;
  };

  return (
    <View style={[styles.container]} display={display}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.boxTitle}>Name</Text>
      <TextInput
        value={name}
        onChangeText={text => {
          setName(text);
          setNameBorder(text.length == 0 ? '#ED474A' : '#00EBB6');
        }}
        autoCapitalize="none"
        style={[styles.textInput, {borderColor: nameBorder}]}
      />
      <Text style={styles.boxTitle}>Email</Text>
      <TextInput
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailBorder(text.length == 0 ? '#ED474A' : '#00EBB6');
        }}
        autoCapitalize="none"
        style={[styles.textInput, {borderColor: emailBorder}]}
      />
      <Text style={styles.boxTitle}>Phone Number</Text>
      <TextInput
        value={phone}
        onChangeText={text => {
          setPhone(text);
          setPhoneBorder(text.length == 0 ? '#ED474A' : '#00EBB6');
        }}
        autoCapitalize="none"
        style={[styles.textInput, {borderColor: phoneBorder}]}
      />
      <Text style={styles.boxTitle}>Message</Text>
      <MultilineTextInput
        value={message}
        onChangeText={text => {
          setMessage(text);
          setMessageBorder(text.length == 0 ? '#ED474A' : '#00EBB6');
        }}
        autoCapitalize="none"
        style={[styles.feedbackInput, {borderColor: messageBorder}]}
      />
      <Text style={styles.boxTitle}>
        * We will get back to you within 24 hours
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (checkInfoVaild()) {
            changeSubpage('none');
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
          }
        }}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
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
    paddingBottom: '25rem',
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
    marginBottom: '15rem',
    paddingLeft: '10rem',
    textAlign: 'left',
    textAlignVertical: 'center',
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
    marginBottom: '7rem',
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
    marginTop: '20rem',
    marginBottom: '300rem',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: '26rem',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ContactUs;
