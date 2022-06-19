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
import {BubblesLoader} from 'react-native-indicator';
import DropDownPicker from 'react-native-dropdown-picker';
import Config from '../../Config.json';

const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const RideHistory = ({display}) => {
  let ridesTemp;
  if (global.rideHistory == null) {
    ridesTemp = [-1];
  } else {
    ridesTemp = global.rideHistory;
  }

  const [rides, setRides] = useState(ridesTemp);
  const [fetched, setFetched] = useState(false);

  if (fetched === false) {
    fetch(Config.SERVER_URL + '/get_rides?user_id=' + global.user_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setRides(data);
        setFetched(true);
      });
  }

  console.log('refreshed');

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
        {rides.map((ride, i) => {
          if (ride === -1) {
            return <BubblesLoader key={-1} />;
          }

          let startTime = new Date(ride.start_time);
          let endTime = new Date(ride.end_time);
          let endTimeHour;
          let endTimeAMPM;
          if (endTime.getHours() < 12) {
            endTimeHour = endTime.getHours();
            endTimeAMPM = 'am';
          } else if (endTime.getHours() === 12) {
            endTimeHour = endTime.getHours();
            endTimeAMPM = 'pm';
          } else {
            endTimeHour = endTime.getHours() - 12;
            endTimeAMPM = 'pm';
          }

          return (
            <View key={i} style={styles.rideItem}>
              <View>
                <Text style={styles.startTime}>
                  {MONTHS[startTime.getMonth()]} {startTime.getDate()},{' '}
                  {startTime.getFullYear()}
                </Text>
              </View>
              <View style={styles.secondRow}>
                <Text style={styles.beachName}>{ride.beach_name}</Text>
                <Text style={styles.cost}>$ {ride.cost}</Text>
              </View>
              <View>
                <Text style={styles.endTime}>
                  {/* eslint-disable-next-line prettier/prettier */}
                  {endTimeHour < 10 ? '0' : ''}{endTimeHour}:
                  {/* eslint-disable-next-line prettier/prettier */}
                  {endTime.getMinutes() < 10 ? '0' : ''}{endTime.getMinutes()}
                  {endTimeAMPM}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  width100: {
    width: '100%',
  },
  beachName: {
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: '19rem',
    paddingTop: 12 * rem,
    paddingLeft: 24 * rem,
    paddingBottom: 0.5 * rem,
  },
  endTime: {
    color: 'black',
    fontFamily: 'Montserrat',
    fontSize: '14rem',
    paddingLeft: 35 * rem,
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cost: {
    color: 'black',
    fontSize: '22rem',
    paddingRight: '11rem',
  },
  startTime: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: '20rem',
    color: 'black',
  },
  rideItem: {
    color: 'black',
    paddingTop: '16rem',
    paddingBottom: '16rem',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
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
    // paddingTop: '19rem',
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
  subText: {
    fontSize: '16rem',
    fontFamily: 'Montserrat',
  },
  question: {
    color: 'black',
  },
  answer: {
    color: 'black',
  },
});

export default RideHistory;
