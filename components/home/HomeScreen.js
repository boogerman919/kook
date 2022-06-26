'use strict';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Dimensions,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
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
import PanelComment from './PanelComment';
import Menu from '../Menu';
import SubPages from '../subPages/SubPages';
import SubPages2 from '../subPages/subPages2/SubPages2.js';
import NfcPage from "./NfcPage";
import NfcManager from 'react-native-nfc-manager';
//TODO: moving readNdef to Subs.js might broke some things.
import {timeConverter, readNdef, writeNdef} from '../common/Subs';

import Config from '../../Config.json';

// w: 390 h: 844
const window = Dimensions.get('window');

var rem = window.width / 390;
EStyleSheet.build({$rem: rem});

const BOARD_ID = 1;

const HomeScreen = () => {
  // stages: ['landing', 'nfc', 'started', 'returned', 'charge', 'feedback']
  const [currentStage, setCurrentStage] = useState('landing');

  // subpages: ['none', 'rideHistory', 'safety', 'faq', 'contactUs', 'legal', 'wallet']
  const [subpageState, setSubpage] = useState('none');

  // just to set the content on the subpage to card page
  const [subpageState2, setSubpage2] = useState('none');

  // set to show the subpages or not
  const [showSubpage, setShowSubpage] = useState(false);

  // set to show the card page or not
  const [showSubpage2, setShowSubpage2] = useState(false);

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
    useState('#00EBB6');

  // surfboard quality feedback text
  const [surfboardFeedback, onChangeSurfboardFeedback] = useState('');

  // app feedback text
  const [appFeedback, onChangeAppFeedback] = useState('');

  // show menu or not
  const [showMenu, setShowMenu] = useState(false);

  // record ride_id
  const [ride_id, setRide_id] = useState(0);

  // show text on panel or not
  const [showComment, setShowComment] = useState(1);

  // panel text
  const [commentText, setCommentText] = useState('$5 / hour');

  // panel text color
  const [commentColor, setCommentColor] = useState('#6A6A6A');

  // panel text size
  const [commentTextSize, setCommentTextSize] = useState(14);

  // nfc page opacity
  const [showNfcPage, setShowNfcPage] = useState(0);

  // Things that will happen after pressing the main button
  const buttonReaction = currentStage => {
    console.log(currentStage);
    switch (currentStage) {
      case 'landing':
        setHeightRatio(window.width / window.height);
        setButtonColor('#ED474A');
        setButtonText('Cancel');
        setCurrentStage('nfc');
        setShowComment(0);
        setShowNfcPage(1);
        nfcUnlock();
        break;
      case 'nfc':
        setShowNfcPage(0);
        NfcManager.cancelTechnologyRequest();
        setHeightRatio(2.8);
        setButtonText('Surf');
        setButtonColor('#00EBB6');
        setShowComment(1);
        setCurrentStage('landing');
        break;
      case 'started':
        setButtonColor('#ED474A');
        setButtonText('Cancel');
        setHeightRatio(window.width / window.height);
        setCurrentStage('scanLock');
        setCommentText('Scan the NFC to end session');
        setCommentTextSize(20);
        setCommentColor('black');
        setShowComment(1);
        checkNfcLock();
        break;
      case 'scanLock':
        NfcManager.cancelTechnologyRequest();
        setButtonColor('#00EBB6');
        setButtonText('End Session');
        setHeightRatio(2);
        setShowComment(0);
        setCurrentStage('started');
        break;
      case 'returned':
        setHeightRatio(1.22);
        setShowStopwatch(0);
        setButtonText('Next');
        setShowComment(0);
        setShowReceipt(1);
        setCurrentStage('charge');
        break;
      case 'charge':
        setShowReceipt(0);
        setTriggerReceipt(1);
        setHeightRatio(window.width / window.height);
        setStopwatchTime(0);
        setShowFeedback(1);
        setButtonText('Done');
        setCurrentStage('feedback');
        break;
      case 'feedback':
        // Check if inputs are empty
        let anyEmpty = false;
        if (surfboardFeedback.trim() === '') {
          setSurfboardFeedbackBorder('#ed2e1c');
          anyEmpty = true;
        } else {
          setSurfboardFeedbackBorder('#00EBB6');
        }
        if (anyEmpty) {
          return;
        }

        // Send feedback to server
        sendFeedback();
        onChangeSurfboardFeedback('');
        onChangeAppFeedback('');

        Keyboard.dismiss();
        setShowFeedback(0);
        setHeightRatio(2.8);
        setStopwatchTime(0);
        setCommentText('$5 / hour');
        setCommentColor('#6A6A6A');
        setCommentTextSize(14);
        setShowComment(1);
        setButtonText('Surf');
        setCurrentStage('landing');
        break;
    }
  };

  const sendFeedback = async () => {
    let res = await fetch(Config.SERVER_URL + '/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Feedback-5gJge',
        email: global.email,
        phone: 'Feedback-h2Mhf',
        message: 'surfboard: ' + surfboardFeedback + '\n\n\napp:' + appFeedback,
      }),
    });
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
      case 'wallet':
      case 'legal':
        setShowMenu(false);
        setShowSubpage(true);
        setSubpage(subpage);
        break;
    }
  };

  const changeSubpage2 = subpage => {
    switch (subpage) {
      case 'none':
        setSubpage2(subpage);
        setShowSubpage2(false);
        break;
      case 'addCard':
        setShowMenu(false);
        setShowSubpage2(true);
        setSubpage2(subpage);
        break;
    }
  };

  const nfcUnlock = async () => {
    NfcManager.start();
    let unlockSuccess = await writeNdef();
    if (unlockSuccess) {
      startSession();
    } else {
      setHeightRatio(2.8);
      setButtonText('Surf');
      setButtonColor('#00EBB6');
      setCurrentStage('landing');
    }
  };

  const checkNfcLock = async () => {
    let locked = await readNdef();
    if (locked) {
      endSession();
    }
  };

  const startSession = async () => {
    let res = await fetch(Config.SERVER_URL + '/start_ride', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user_id: global.user_id, board_id: BOARD_ID}),
      // TODO: make BOARD_ID an actual thing
    });
    let rideInfo = await res.json();
    setRide_id(rideInfo.ride_id);
    let startTime = new Date(rideInfo.start_time).getTime();
    let timeNow = new Date().getTime();
    setStopwatchTime(Math.floor((timeNow - startTime) / 1000));
    setHeightRatio(2);
    setButtonColor('#00EBB6');
    setButtonText('End Session');
    // setButtonOpacity(1);
    setShowStopwatch(1);
    setShowNfcPage(0);
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
    BackgroundTimer.stopBackgroundTimer();
    setButtonOpacity(0.2);
    setCommentText('Session ended');
    setButtonColor('#00EBB6');
    setButtonText('Next');
    setCurrentStage('returned');
    setHeightRatio(1.7);
  };

  const toggleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  /* ANIMATIONS!!! */

  // panel motion effect
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

  // subpage2 slide in animation
  const subpage2RightOffset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    var toValue = window.width;
    if (showSubpage2) {
      toValue = 0;
    }
    Animated.timing(subpage2RightOffset, {
      toValue: toValue,
      useNativeDriver: false,
      duration: 200,
    }).start();
  }, [showSubpage2, subpage2RightOffset]);

  var contents = [
    <NfcPage key="nfcPage" showNfcPage={showNfcPage} />,
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
    <PanelComment
      key="panelcomment"
      showComment={showComment}
      commentText={commentText}
      commentColor={commentColor}
      commentTextSize={commentTextSize}
    />,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={false}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Menu
            showMenu={showMenu}
            toggleMenu={toggleMenu}
            changeSubpage={changeSubpage}
          />
          <Button
            position={{left: -155 * rem, top: 20 * rem}}
            style={styles.toggleMenu}
            action={toggleMenu}
          />
          <Panel panelHeight={panelHeight} contents={contents} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <MainButton
              buttonReaction={buttonReaction}
              currentStage={currentStage}
              text={buttonText}
              buttonColor={buttonColor}
              buttonOpacity={buttonOpacity}
            />
          </KeyboardAvoidingView>
          <Stopwatch
            stopwatchOpacity={stopwatchOpacity}
            time={timeConverter(stopwatchTime)}
          />
          <SubPages
            subpageState={subpageState}
            rightOffset={subpageRightOffset}
            changeSubpage={changeSubpage}
            setShowSubpage2={setShowSubpage2}
            changeSubpage2={changeSubpage2}
          />
          <SubPages2
            subpageState={subpageState2}
            rightOffset={subpage2RightOffset}
            changeSubpage={changeSubpage2}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = EStyleSheet.create({
  keyboardView: {
    flex: 1,
    alignItems: 'center',
    marginBottom: '-20rem'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#05F2BC',
  },
  toggleMenu: {
    fontSize: '20rem',
    color: 'black',
  },
});

export default HomeScreen;
