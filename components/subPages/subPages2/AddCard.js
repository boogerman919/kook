'use strict';
import React, {useState, useContext} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {AuthContext} from '../context';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

// creating '···· ···· ···· ····'
const placeholderText = () => {
  let text = '';
  for (let i = 0; i < 16; i++) {
    if (i % 4 == 0 && i != 0) text += ' ';
    text += '\u25CF';
  }
  return text;
};

const AddCard = ({display, changeSubpage}) => {
  const [cardNum, setCardNum] = useState('');
  // TODO: set user email as default
  const [expDate, setExpDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [cardNumBorder, setCardNumBorder] = useState('#00EBB6');
  const [expDateBorder, setExpDateBorder] = useState('#00EBB6');
  const [cvvBorder, setCVVBorder] = useState('#00EBB6');
  const [zipCodeBorder, setZipCodeBorder] = useState('#00EBB6');

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

  const cardTextStyle = () => {
    let formattedNum = '';
    for (let i = 0; i < cardNum.length; i++) {
      if (i % 4 == 0 && i != 0) formattedNum += ' ';
      formattedNum += cardNum[i];
    }
    return formattedNum;
  };

  const dateTextStyle = () => {
    let formattedDate = '';
    for (let i = 0; i < expDate.length; i++) {
      if (i % 2 == 0 && i != 0) formattedDate += '/';
      formattedDate += expDate[i];
    }
    return formattedDate;
  };

  const checkDateValid = (text) => {
    text = text.split('/').join('');
    if (text.length < 4) return false;
    const now = new Date();
    let month = parseInt(text.substring(0, 2));
    let year = parseInt(text.substring(text.length - 2, text.length));
    console.log(month);
    if (month > 12 || year < now.getFullYear() % 100) return false;
    return true;
  };

  const checkInfoVaild = () => {
    let valid = true;
    if (cardNum.length != 16) {
      setCardNumBorder('#ED474A');
      valid = false;
    }
    if (!checkDateValid(expDate)) {
      setExpDateBorder('#ED474A');
      valid = false;
    }
    if (cvv.length != 3) {
      setCVVBorder('#ED474A');
      valid = false;
    }
    if (zipCode.length != 5) {
      setZipCodeBorder('#ED474A');
      valid = false;
    }
    return valid;
  };

  return (
    <View style={[styles.container]} display={display}>
      <Text style={styles.title}>Add your card</Text>

      {/* card number box */}
      <View style={[styles.boxContainer, {width: '85%'}]}>
        <TextInput
          value={cardTextStyle()}
          onChangeText={text => {
            setCardNum(text.split(' ').join(''));
            setCardNumBorder(text.length == 19 ? '#00EBB6' : '#ED474A');
          }}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={19}
          placeholder={placeholderText()}
          style={[
            styles.textInput,
            {
              borderColor: cardNumBorder,
              paddingTop: Platform.OS === 'ios' ? 10 * rem : 20 * rem,
            },
          ]}
        />
        <Text style={styles.boxTitle}>Card Number</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '85%',
          justifyContent: 'space-between',
        }}>
        {/* exp date box */}
        <View style={[styles.boxContainer, {width: '60%'}]}>
          <TextInput
            value={dateTextStyle()}
            onChangeText={text => {
              setExpDate(text.split('/').join(''));
              setExpDateBorder(checkDateValid(text) ? '#00EBB6' : '#ED474A');
              console.log(expDate);
            }}
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={5}
            placeholder={'MM / YY'}
            style={[
              styles.textInput,
              {
                borderColor: expDateBorder,
                paddingTop: Platform.OS === 'ios' ? 10 * rem : 20 * rem,
              },
            ]}
          />
          <Text style={styles.boxTitle}>Expiration Date</Text>
        </View>
        {/* cvv box */}
        <View style={[styles.boxContainer, {width: '32%'}]}>
          <TextInput
            value={cvv}
            onChangeText={text => {
              setCVV(text);
              setCVVBorder(text.length == 3 ? '#00EBB6' : '#ED474A');
            }}
            autoCapitalize="none"
            keyboardType="number-pad"
            maxLength={3}
            placeholder={'\u25CF' + '\u25CF' + '\u25CF'}
            style={[
              styles.textInput,
              {
                borderColor: cvvBorder,
                paddingTop: Platform.OS === 'ios' ? 10 * rem : 20 * rem,
              },
            ]}
            secureTextEntry
          />
          <Text style={styles.boxTitle}>CVV</Text>
        </View>
      </View>
      {/* zip code box */}
      <View style={[styles.boxContainer, {width: '85%'}]}>
        <TextInput
          value={zipCode}
          onChangeText={text => {
            setZipCode(text);
            setZipCodeBorder(text.length == 0 ? '#ED474A' : '#00EBB6');
          }}
          autoCapitalize="none"
          keyboardType="number-pad"
          maxLength={5}
          style={[
            styles.textInput,
            {
              borderColor: zipCodeBorder,
              paddingTop: Platform.OS === 'ios' ? 10 * rem : 20 * rem,
            },
          ]}
        />
        <Text style={styles.boxTitle}>Zip Code</Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (checkInfoVaild()) {
            console.warn('card added!');
            changeSubpage('none');
            setCardNum('');
            setExpDate('');
            setCVV('');
            setZipCode('');
          }
        }}>
        <Text style={styles.btnText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: '100%',
    marginTop: '100rem',
    marginLeft: '-61rem',
    alignItems: 'center',
  },
  boxContainer: {
    height: '50rem',
    marginBottom: '20rem',
  },
  title: {
    fontSize: '22rem',
    color: 'black',
    width: '100%',
    left: '15%',
    textAlign: 'left',
    paddingBottom: '25rem',
    fontFamily: 'Montserrat-SemiBold',
  },
  boxTitle: {
    position: 'absolute',
    top: '5rem',
    left: '15rem',
    color: 'black',
    fontSize: '10rem',
    textAlign: 'left',
    fontFamily: 'Montserrat-Medium',
    opacity: 0.5,
  },
  textInput: {
    flex: 1,
    fontSize: '14rem',
    fontFamily: 'Montserrat-Medium',
    backgroundColor: 'white',
    borderColor: '#00EBB6',
    borderWidth: '0.5rem',
    borderRadius: '10rem',
    paddingLeft: '15rem',
    textAlign: 'left',
    textAlignVertical: 'top',
    color: 'grey',
  },
  placeholder: {
    flex: 1,
    fontSize: '14rem',
    backgroundColor: 'white',
    color: 'grey',
    fontFamily: 'Montserrat-Bold',
    borderColor: '#00EBB6',
    borderWidth: '0.5rem',
    borderRadius: '10rem',
    paddingLeft: '15rem',
    textAlign: 'left',
    textAlignVertical: 'top',
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

export default AddCard;
