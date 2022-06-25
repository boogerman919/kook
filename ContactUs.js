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
import {ScrollView} from 'react-native-gesture-handler';

import Config from '../../Config.json';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const ContactUs = ({display, changeSubpage}) => {
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
    <View style={styles.container} display={display}>
      <View style={[styles.width100, styles.header]}>
        <Text style={styles.title}>Ride History</Text>
        <Text style={styles.subText} />
      </View>
      <ScrollView
        style={[styles.faqScroll]}
        contentContainerStyle={{flexGrow: 1}}
        removeClippedSubviews={true}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>name (optional)</Text>
        </View>
        <TextInput
          value={name}
          autoCapitalize="words"
          onChangeText={setName}
          style={[styles.textInput, styles.inputOneLine]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>email</Text>
        </View>
        <TextInput
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
          style={[
            styles.textInput,
            styles.inputOneLine,
            {borderColor: emailBorder},
          ]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>phone (optional)</Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={[styles.textInput, styles.inputOneLine]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>message</Text>
        </View>
        <TextInput
          value={message}
          placeholder=""
          multiline
          editable
          numberOfLines={40}
          onChangeText={setMessage}
          style={[
            styles.textInput,
            styles.multilineInput,
            {borderColor: messageBorder},
          ]}
        />
        <TouchableOpacity
          onPress={() => {
            if (email === '' || message === '') {
              if (email === '') {
                setEmailBorder('#ed7c72');
              } else {
                setEmailBorder('#05F2BC');
              }
              if (message === '') {
                setMessageBorder('#ed7c72');
              } else {
                setMessageBorder('#05F2BC');
              }
              return;
            }

            setMessage('');
            sendContactMessage();

            changeSubpage('none');
            // TODO: make thank you pop up
          }}
          style={styles.btn}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  width100: {
    width: '100%',
  },
  container: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: '100%',
    position: 'relative',
    //top: '-61rem',
    marginLeft: '-61rem',
    flexGrow: 3,
  },
  faqScroll: {
    paddingLeft: '18rem',
    paddingRight: '18rem',
    paddingTop: '19rem',
    width: '100%',
    height: window.height - 63 * rem,
  },
  title: {
    fontSize: '28rem',
    color: 'black',
    width: '100%',
    textAlign: 'right',
    fontFamily: 'Montserrat-SemiBold',
  },
  text: {
    color: '#616161',
    fontSize: '13rem',
    paddingTop: '5rem',
    paddingBottom: '2rem',
    fontFamily: 'Montserrat-Medium',
    textAlign: 'right',
    paddingRight: '10rem',
  },
  inputOneLine: {
    height: '43rem',
  },
  textInput: {
    color: 'black',
    backgroundColor: '#F8F8F8',
    borderColor: '#05F2BC',
    borderWidth: '2rem',
    borderRadius: '2rem',
    fontFamily: 'Montserrat-Medium',
    paddingLeft: '10rem',
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: '200rem',
  },
  header: {
    backgroundColor: '#07f2bd', // i made it darker just because, it might be a bad idea
    paddingLeft: '18rem',
    paddingRight: '18rem',
    paddingTop: '23rem',
    borderBottomWidth: 2,
    borderColor: 'grey',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  btn: {
    width: '120rem',
    aspectRatio: 3,
    backgroundColor: '#00EBB6',
    shadowOffset: {width: 0, height: '-2rem'},
    shadowOpacity: 0.15,
    shadowRadius: '10rem',
    borderRadius: '8rem',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15rem',
    marginBottom: '25rem',
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: '19rem',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default ContactUs;
