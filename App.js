'use strict';
import React, {useState, useEffect, useRef} from 'react';
import {View, Dimensions, Animated, Text, TouchableOpacity} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import EStyleSheet from 'react-native-extended-stylesheet';
import {parse} from '@babel/core';
import Panel from './components/Panel';
import MainButton from './components/MainButton';
import Button from './components/Buttons';
import Stopwatch from './components/Stopwatch';
import Receipt from './components/Receipt';
import Menu from './components/Menu';

// w: 390 h: 844
const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const USER_ID = 1;
const BOARD_ID = 1;

const App = () => {
  // stages: ['landing', 'nfc', 'started', 'returned', 'charge']
  const [currentStage, setCurrentStage] = useState('landing');

  // Height Ratio for Panel's Height
  const [heightRatio, setHeightRatio] = useState(2.8);

  // MainButton's color
  const [buttonColor, setButtonColor] = useState('#00EBB6');

  // text: ['Surf', 'Cancel', 'End Session']
  const [buttonText, setButtonText] = useState('Surf');

  // opacity: {'button on': 0.2, 'button off': 1}
  const [buttonOpacity, setButtonOpacity] = useState(0.2);

  // show Stopwatch or not
  const [showStopwatch, setShowStopwatch] = useState(0);

  // stopwatch time
  const [stopwatchTime, setStopwatchTime] = useState(0);

  // show receipt or not
  const [showReceipt, setShowReceipt] = useState(0);

  // triggers receipt animation
  const [triggerReceipt, setTriggerReceipt] = useState(false);

  // show menu or not
  const [showMenu, setShowMenu] = useState(false);

  // record ride_id
  const [ride_id, setRide_id] = useState(0);

  // Things that will happen after pressing the main button
  const buttonReaction = currentStage => {
    switch (currentStage) {
      case 'landing':
        setHeightRatio(window.width / window.height);
        setButtonColor('#ED474A');
        setButtonText('Cancel');
        setCurrentStage('nfc');
        break;
      case 'nfc':
        startSession();
        break;
      case 'started':
        endSession();
        break;
      case 'returned':
        setHeightRatio(1.22);
        setShowStopwatch(0);
        setButtonText('Done');
        setShowReceipt(1);
        setCurrentStage('charge');
        break;
      case 'charge':
        setShowReceipt(0);
        setTriggerReceipt(1);
        setHeightRatio(2.8);
        setStopwatchTime(0);
        setButtonText('Surf');
        setCurrentStage('landing');
        break;
    }
  };

  // converts seconds into hh:mm:ss form
  const timeConverter = time => {
    let h =
      parseInt(time / 3600) >= 10
        ? `${parseInt(time / 3600)}:`
        : `0${parseInt(time / 3600)}:`;
    let m =
      parseInt((time % 3600) / 60) >= 10
        ? `${parseInt((time % 3600) / 60)}:`
        : `0${parseInt((time % 3600) / 60)}:`;
    let s = time % 60 >= 10 ? `${time % 60}` : `0${time % 60}`;
    return h + m + s;
  };

  const startSession = async () => {
    let res = await fetch('http://127.0.0.1:5000/start_ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: USER_ID, board_id: BOARD_ID}),
    });
    let rideInfo = await res.json();
    setRide_id(rideInfo.ride_id);
    let startTime = new Date(rideInfo.start_time).getTime();
    let timeNow = new Date().getTime();
    setStopwatchTime(Math.floor((timeNow - startTime) / 1000));
    setHeightRatio(2);
    setButtonColor('#D2D2D2');
    setButtonText('End Session');
    setButtonOpacity(1);
    setShowStopwatch(1);
    setCurrentStage('started');
    BackgroundTimer.runBackgroundTimer(() => {
      setStopwatchTime(prevStopwatchTime => prevStopwatchTime + 1);
    }, 1000);
  };

  const endSession = async () => {
    let res = await fetch('http://127.0.0.1:5000/end_ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ride_id: ride_id}),
    });
    let result = await res.json();
    let startTime = new Date(result.start_time).getTime();
    let endTime = new Date(result.end_time).getTime();
    setStopwatchTime(Math.floor((endTime - startTime) / 1000));
    setHeightRatio(2);
    BackgroundTimer.stopBackgroundTimer();
    setButtonOpacity(0.2);
    setButtonColor('#00EBB6');
    setCurrentStage('returned');
  };

  const toggleMenu = () => {
    if (showMenu) setShowMenu(false);
    else setShowMenu(true);
  };

  /* ANIMATIONS!!! */

  // panal motion effect
  const panelHeight = useRef(
    new Animated.Value((window.width / heightRatio) * rem),
  ).current;
  useEffect(() => {
    Animated.timing(panelHeight, {
      toValue: (window.width / heightRatio) * rem,
      useNativeDriver: false,
      duration: 250,
    }).start(() => {
      setTriggerReceipt(true);
    });
  }, [heightRatio]);

  // stopwatch opacity effect
  const stopwatchOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(stopwatchOpacity, {
      toValue: showStopwatch,
      useNativeDriver: false,
      duration: 250,
    }).start();
  }, [showStopwatch]);

  // receipt opacity effect
  const receiptOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(receiptOpacity, {
      toValue: showReceipt,
      useNativeDriver: false,
      duration: 30,
    }).start();

    return () => {
      setTriggerReceipt(false);
    };
  }, [triggerReceipt]);

  var contents = [
    <Receipt
      key="receipt"
      usedTime={stopwatchTime}
      receiptOpacity={receiptOpacity}
    />,
  ];

  return (
    <View style={styles.container}>
      <Menu showMenu={showMenu} toggleMenu={toggleMenu}></Menu>
      <Button
        position={{right: -135 * rem, top: 80 * rem}}
        action={toggleMenu}></Button>
      <Panel panelHeight={panelHeight} contents={contents} />
      <MainButton
        buttonReaction={buttonReaction}
        currentStage={currentStage}
        text={buttonText}
        buttonColor={buttonColor}
        buttonOpacity={buttonOpacity}
      />
      <Stopwatch
        stopwatchOpacity={stopwatchOpacity}
        time={timeConverter(stopwatchTime)}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#05F2BC',
  },
});

export default App;
