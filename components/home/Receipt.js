import React from 'react';
import {View, Text, Dimensions, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

const monthNames = [
  'JANUARY',
  'FEBUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];

EStyleSheet.build({$rem: window.width / 390});

const Receipt = ({usedTime, receiptOpacity}) => {
  const fareRate = 5 / 3600;
  const taxRate = 0.075;

  // date conversion
  const date = new Date();
  const month = monthNames[date.getMonth()];
  const day = date.getDay();
  const hour = date.getHours();
  const min = date.getMinutes();

  const formattedDate = `${month} ${day}  ${hour}:${min}`;

  // time conversion
  const h = parseInt(usedTime / 3600);
  const m = parseInt((usedTime % 3600) / 60);
  const s = usedTime % 60;

  const fareText = `fare (${h}h ${m}m ${s}s)`;

  // fare calculation
  const fareNumber = usedTime * fareRate;

  const fare = `$${fareNumber.toFixed(2)}`;
  const tax = `$${(fareNumber * taxRate).toFixed(2)}`;
  const total = `$${(fareNumber * (1 + taxRate)).toFixed(2)}`;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: receiptOpacity,
          display: receiptOpacity == 1 ? 'flex' : 'none',
        },
      ]}>
      <View key="title container" style={styles.titleContainer}>
        <Text key="date" style={styles.date}>
          {formattedDate}
        </Text>
        <Text key="title" style={styles.title}>
          Thanks for using Kook!
        </Text>
      </View>
      <View key="fare container" style={styles.textContainer}>
        <Text key="fare text" style={styles.text}>
          {fareText}
        </Text>
        <Text key="fare" style={styles.text}>
          {fare}
        </Text>
      </View>
      <View key="tax container" style={styles.textContainer}>
        <Text key="tax text" style={styles.text}>
          tax
        </Text>
        <Text key="tax" style={styles.text}>
          {tax}
        </Text>
      </View>
      <View key="total container" style={styles.textContainer}>
        <Text key="total text" style={styles.totalText}>
          Total
        </Text>
        <Text key="total" style={styles.totalText}>
          {total}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    order: 2,
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginBottom: '10rem',
  },
  textContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  date: {
    color: 'black',
    fontSize: '14rem',
    fontFamily: 'Montserrat-Medium',
  },
  title: {
    color: 'black',
    fontSize: '25rem',
    fontFamily: 'Montserrat-Bold',
  },
  text: {
    color: 'black',
    fontSize: '20rem',
    fontFamily: 'Montserrat-Medium',
  },
  totalText: {
    color: 'black',
    fontSize: '23rem',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default Receipt;
