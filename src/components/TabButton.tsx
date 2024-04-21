import React, {Component, ReactNode, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {COLORS} from '../theme/theme';
import Icon from "react-native-vector-icons/AntDesign"

type Props = {
  icon: ReactNode | string;
  onFocus: Function | undefined;
  onPress: Function | undefined;
};

const TabButton = (props: Props) => {
  const viewRef = useRef<any | null>(null);
  const [color, setColor] = useState(COLORS.primaryOrangeHex);
  useFocusEffect(
    React.useCallback(() => {
      if (viewRef && viewRef.current) {
        viewRef.current.animate({
          0: { rotate: '0deg'},
          1: { rotate: '360deg'},
        });
        setColor(COLORS.primaryWhiteHex);
      }

      return () => {
        setColor(COLORS.primaryOrangeHex);
      };
    }, []),
  );
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.onPress) props.onPress();
      }}
      style={styles.container}>
      <Animatable.View ref={viewRef}>
        {typeof props.icon === 'string' ? (
          <Icon
            name={props.icon}
            size={30}
            color={color}
            style={{alignSelf: 'center'}}
          />
        ) : (
          props.icon
        )}
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
export default TabButton;
