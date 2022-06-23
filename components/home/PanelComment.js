import React from 'react';
import {View, Text, Dimensions, Animated} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const window = Dimensions.get('window');

EStyleSheet.build({$rem: window.width / 390});

const PanelComment = ({
  showComment,
  commentText,
  commentColor,
  commentTextSize,
}) => {
  let textSize = commentTextSize * window.width / 390;

  return (
    <Animated.View
      style={[styles.container, {display: showComment == 1 ? 'flex' : 'none'}]}>
      <View style={styles.commentContainer}>
        <Text style={[styles.text, {color: commentColor, fontSize: textSize}]}>
          {commentText}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
  },
  commentContainer: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  },
});

export default PanelComment;
