import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';
import AuthHeader from '../../components/authHeader';
import InputBox from '../../components/inputBox';

const Requirement = ({ ok, label }) => (
  <View className="flex-row items-center w-[48%] pr-1">
    <Icon
      name={ok ? 'checkmark-circle' : 'ellipse-outline'}
      size={14}
      color={ok ? colours.primary : '#9CA3AF'}
    />
    <Text
      className={`font-manrope-medium text-xs leading-[18px] ml-1.5 shrink pr-1 ${
        ok ? 'text-gray-900 font-manrope-bold' : 'text-gray-500'
      }`}
      numberOfLines={2}>
      {label}
    </Text>
  </View>
);

/**
 * RegistrationScreen — Tailwind/NativeWind UI matching cleanz24app implementation.
 */
function RegistrationScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const securityScore = [
    hasMinLength,
    hasUpper && hasLower,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  const handleRegister = () => {
    let valid = true;
    if (!name.trim()) {
      setNameError('Full name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      valid = false;
    } else if (phone.trim().length < 6) {
      setPhoneError('Please enter a valid phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (!hasMinLength) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    } else if (!hasUpper || !hasLower) {
      setPasswordError('Password must include upper and lower case letters');
      valid = false;
    } else if (!hasNumber) {
      setPasswordError('Password must include at least one number');
      valid = false;
    } else if (!hasSpecial) {
      setPasswordError(
        'Password must include at least one special character (!@#$)',
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      console.log('Registering user', {
        name: name.trim(),
        phone: phone.trim(),
        password,
      });
      navigation?.navigate?.('Otp', {
        phone: phone.trim(),
        isRegistration: true,
      });
    }
  };

  const strengthColor =
    securityScore <= 1
      ? '#EF4444'
      : securityScore <= 3
        ? '#F59E0B'
        : colours.primary;

  const strengthLabel =
    securityScore <= 1 ? 'Weak' : securityScore <= 3 ? 'Medium' : 'Strong';

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
                Create Account
              </Text>
              <Text className="font-manrope text-sm leading-[22px] text-gray-500 pr-1.5">
                Join Swify for seamless hostel booking & smart living.
              </Text>
            </View>

            <View>
              <InputBox
                label="Full Name"
                placeholder="Enter your full name"
                iconName="person-outline"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (text) setNameError('');
                }}
                error={!!nameError}
                errorMessage={nameError}
              />

              <InputBox
                label="Phone Number"
                placeholder="Enter your phone number"
                iconName="call-outline"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (text) setPhoneError('');
                }}
                error={!!phoneError}
                errorMessage={phoneError}
              />

              <InputBox
                label="Password"
                placeholder="Create a strong password"
                iconName="lock-closed-outline"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text) setPasswordError('');
                  if (confirmPassword && text === confirmPassword) {
                    setConfirmPasswordError('');
                  }
                }}
                error={!!passwordError}
                errorMessage={passwordError}
                rightComponent={
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Icon
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                }
              />

              {password.length > 0 ? (
                <View className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 mb-4">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="font-manrope-semibold text-xs leading-[18px] text-gray-700 shrink pr-1.5">
                      Password Security Strength:
                    </Text>
                    <Text
                      className="font-manrope-extrabold text-xs leading-[18px] pr-1"
                      style={{ color: strengthColor }}>
                      {strengthLabel}
                    </Text>
                  </View>

                  <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${(securityScore / 4) * 100}%`,
                        backgroundColor: strengthColor,
                      }}
                    />
                  </View>

                  <View className="flex-row flex-wrap justify-between gap-y-2">
                    <Requirement ok={hasMinLength} label="8+ Characters" />
                    <Requirement
                      ok={hasUpper && hasLower}
                      label="Upper & Lower case"
                    />
                    <Requirement ok={hasNumber} label="1+ Number" />
                    <Requirement ok={hasSpecial} label="1+ Symbol (!@#$)" />
                  </View>
                </View>
              ) : null}

              <InputBox
                label="Confirm Password"
                placeholder="Confirm your password"
                iconName="lock-closed-outline"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (text === password) setConfirmPasswordError('');
                }}
                error={!!confirmPasswordError}
                errorMessage={confirmPasswordError}
                rightComponent={
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Icon
                      name={
                        showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
                      }
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>

          <View className="mt-8 mb-4">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleRegister}
              className="w-full rounded-2xl h-14 items-center justify-center mb-4"
              style={{ backgroundColor: colours.primary }}>
              <Text
                className="font-manrope-bold text-base leading-[22px] pr-1"
                style={{ color: colours.white }}>
                Verify Account
              </Text>
            </TouchableOpacity>

            <Text
              className="font-manrope text-sm leading-[22px] text-gray-500 text-center pr-1"
              onPress={() => navigation?.goBack?.()}>
              Already have an account?{' '}
              <Text
                className="font-manrope-bold text-sm leading-[22px]"
                style={{ color: colours.textPrimary }}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default RegistrationScreen;
