'use strict';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import EStyleSheet from 'react-native-extended-stylesheet';
import {parse} from '@babel/core';
import Panel from './Panel';
import MainButton from './MainButton';
import Button from './Buttons';
import Stopwatch from './Stopwatch';
import Receipt from './Receipt';
import Feedback from './Feedback';
import Menu from '../Menu';
import SubPages from '../subPages/SubPages';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

import Config from '../../Config.json';

NfcManager.start();

// w: 390 h: 844
const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const USER_ID = 1;
const BOARD_ID = 1;

const HomeScreen = () => {
  // stages: ['landing', 'nfc', 'started', 'returned', 'charge', 'feedback']
  const [currentStage, setCurrentStage] = useState('landing');

  // subpages: ['none', 'rideHistory', 'safety', 'faq', 'contactUs', 'legal']
  const [subpageState, setSubpage] = useState('none');

  // set to show the subpages or not
  const [showSubpage, setShowSubpage] = useState(false);

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

  // show feedback or not
  const [showFeedback, setShowFeedback] = useState(0);

  // app feedback border color
  const [appFeedbackBorder, setAppFeedbackBorder] = useState('grey');

  // surfboard feedback border color
  const [surfboardFeedbackBorder, setSurfboardFeedbackBorder] =
    useState('grey');

  // surfboard quality feedback text
  const [surfboardFeedback, onChangeSurfboardFeedback] = useState('');

  // app feedback text
  const [appFeedback, onChangeAppFeedback] = useState('');

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
        readNdef();
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
        setButtonText('Next');
        setShowReceipt(1);
        setCurrentStage('charge');
        break;
      case 'charge':
        setShowReceipt(0);
        setTriggerReceipt(1);
        setHeightRatio(0.84);
        setStopwatchTime(0);
        setShowFeedback(1);
        setButtonText('Done');
        setCurrentStage('feedback');
        break;
      case 'feedback':
        // Check if inputs are empty
        let anyEmpty = false;
        if (appFeedback.trim() === '') {
          setAppFeedbackBorder('#ed2e1c');
          anyEmpty = true;
        } else {
          setAppFeedbackBorder('grey');
        }
        if (surfboardFeedback.trim() === '') {
          setSurfboardFeedbackBorder('#ed2e1c');
          anyEmpty = true;
        } else {
          setSurfboardFeedbackBorder('grey');
        }
        if (anyEmpty) {
          return;
        }

        // Send feedback to server
        // TODO:

        Keyboard.dismiss();
        setShowFeedback(0);
        setHeightRatio(2.8);
        setStopwatchTime(0);
        setButtonText('Surf');
        setCurrentStage('landing');
        break;
    }
  };

  const changeSubpage = subpage => {
    switch (subpage) {
      case 'none':
        setSubpage(subpage);
        setShowSubpage(false);
        break;
      case 'rideHistory':
      case 'safety':
      case 'faq':
      case 'contactUs':
      case 'legal':
        setShowMenu(false);
        setShowSubpage(true);
        setSubpage(subpage);
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

  const readNdef = async () => {
    console.log('reading');
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      return tag;
    } catch (e) {
      console.log(e.message);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const startSession = async () => {
    let res = await fetch(Config.SERVER_URL + '/start_ride', {
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
    let res = await fetch(Config.SERVER_URL + '/end_ride', {
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
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
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
  }, [heightRatio, panelHeight]);

  // stopwatch opacity effect
  const stopwatchOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(stopwatchOpacity, {
      toValue: showStopwatch,
      useNativeDriver: false,
      duration: 250,
    }).start();
  }, [showStopwatch, stopwatchOpacity]);

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
  }, [receiptOpacity, showReceipt, triggerReceipt]);

  // subpage slide in animation
  const subpageRightOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    var toValue = window.width;
    if (showSubpage) {
      toValue = 0;
    }
    Animated.timing(subpageRightOffset, {
      toValue: toValue,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [showSubpage, subpageRightOffset]);

  var contents = [
    <Receipt
      key="receipt"
      usedTime={stopwatchTime}
      receiptOpacity={receiptOpacity}
    />,
    <Feedback
      key="feedback"
      showFeedback={showFeedback}
      surfboardFeedback={surfboardFeedback}
      onChangeSurfboardFeedback={onChangeSurfboardFeedback}
      appFeedback={appFeedback}
      onChangeAppFeedback={onChangeAppFeedback}
      appFeedbackBorder={appFeedbackBorder}
      surfboardFeedbackBorder={surfboardFeedbackBorder}
    />,
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Menu
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          changeSubpage={changeSubpage}
        />
        <Button
          position={{left: -155 * rem, top: 20 * rem}}
          style={{fontSize: '20rem', color: 'black'}}
          action={toggleMenu}
        />
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
        <SubPages
          subpageState={subpageState}
          rightOffset={subpageRightOffset}
          changeSubpage={changeSubpage}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#05F2BC',
  },
});

export default HomeScreen;
