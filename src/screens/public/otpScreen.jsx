import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colours from '../../assets/colours';
import AuthHeader from '../../components/authHeader';

const OTP_LENGTH = 6;
const RESEND_TIMER_SECONDS = 30;

/**
 * OtpScreen — Tailwind/NativeWind UI matching cleanz24app implementation.
 */
function OtpScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const {
    phone = '+91 7731049275',
    isForgotPassword = false,
  } = route?.params || {};

  const titleText = isForgotPassword
    ? 'Reset Password Code'
    : 'Verification Code';

  const subtitleLead = isForgotPassword
    ? "We've sent a 6-digit code to reset your password to"
    : "We've sent a 6-digit verification code to";

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const timerTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(timerTimeout);
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handlePressBoxes = () => {
    inputRef.current?.focus();
  };

  const handleVerify = () => {
    if (otp.length < OTP_LENGTH) {
      setError('Please enter the full 6-digit code');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log('OTP Verified successfully:', otp, 'For Phone:', phone);
      navigation?.reset?.({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setTimer(RESEND_TIMER_SECONDS);
    setError('');
    console.log('Resending verification code to:', phone);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAwareScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={20}
        showsVerticalScrollIndicator={false}>
        <View
          className="grow justify-between px-6"
          style={{
            paddingTop: Math.max(insets.top, 16),
            paddingBottom: Math.max(insets.bottom, 24),
          }}>
          <View>
            <AuthHeader navigation={navigation} />

            <View className="mt-2 mb-6">
              <Text className="font-manrope-extrabold text-[30px] leading-10 text-gray-900 mb-2 pr-1.5">
                {titleText}
              </Text>
              <Text className="font-manrope text-sm leading-[22px] text-gray-500 pr-1.5">
                {subtitleLead}{' '}
                <Text className="font-manrope-bold text-sm leading-[22px] text-gray-900">
                  {phone}
                </Text>
              </Text>
            </View>

            <View className="mt-4 mb-2">
              <Pressable
                onPress={handlePressBoxes}
                className="relative w-full mb-3 items-center justify-center">
                <View className="flex-row justify-between w-full gap-1.5 pointer-events-none">
                  {Array(OTP_LENGTH)
                    .fill(0)
                    .map((_, index) => {
                      const digit = otp[index] || '';
                      const isCurrentDigit = index === otp.length;
                      const isLastDigit = index === OTP_LENGTH - 1;
                      const isFocused =
                        isInputFocused &&
                        (isCurrentDigit ||
                          (otp.length === OTP_LENGTH && isLastDigit));

                      const boxBorderColor = error
                        ? '#EF4444'
                        : isFocused
                          ? colours.primary
                          : '#E5E7EB';
                      const boxBorderWidth = isFocused ? 2 : 1;
                      const boxBgColor = error ? '#FEF2F2' : '#FFFFFF';

                      return (
                        <View
                          key={index}
                          className="flex-1 max-w-14 h-14 rounded-2xl border items-center justify-center"
                          style={{
                            borderColor: boxBorderColor,
                            borderWidth: boxBorderWidth,
                            backgroundColor: boxBgColor,
                          }}>
                          <Text className="font-manrope-extrabold text-xl leading-7 text-gray-900 pr-0.5">
                            {digit}
                          </Text>
                        </View>
                      );
                    })}
                </View>

                <TextInput
                  ref={inputRef}
                  value={otp}
                  onChangeText={(text) => {
                    setOtp(text.replace(/[^0-9]/g, ''));
                    if (text.length > 0) setError('');
                  }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  maxLength={OTP_LENGTH}
                  keyboardType="number-pad"
                  autoFocus
                  caretHidden
                  className="absolute inset-0 opacity-[0.01] text-transparent bg-transparent"
                  selectionColor="transparent"
                  cursorColor="transparent"
                  underlineColorAndroid="transparent"
                  autoComplete="off"
                  importantForAutofill="noExcludeDescendants"
                  textContentType="none"
                  disableFullscreenUI
                />
              </Pressable>

              {error ? (
                <Text className="font-manrope-medium text-xs leading-[18px] text-red-500 mt-1 text-center pr-1">
                  {error}
                </Text>
              ) : null}

              <Text className="font-manrope text-sm leading-[22px] text-gray-500 text-center mt-6 pr-1">
                Didn't receive the code?{' '}
                {canResend ? (
                  <Text
                    className="font-manrope-bold text-sm leading-[22px]"
                    style={{ color: colours.textPrimary }}
                    onPress={handleResend}>
                    Resend Code
                  </Text>
                ) : (
                  <Text className="font-manrope-bold text-sm leading-[22px] text-gray-400">
                    Resend in {timer}s
                  </Text>
                )}
              </Text>
            </View>
          </View>

          <View className="mt-8 mb-4">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleVerify}
              disabled={loading}
              className="w-full rounded-2xl h-14 items-center justify-center mb-4"
              style={{ backgroundColor: colours.primary }}>
              {loading ? (
                <ActivityIndicator color={colours.white} />
              ) : (
                <Text
                  className="font-manrope-bold text-base leading-[22px] pr-1"
                  style={{ color: colours.white }}>
                  Verify & Proceed
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default OtpScreen;
