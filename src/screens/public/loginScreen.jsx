import React, { useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colours from '../../assets/colours';
import AuthHeader from '../../components/authHeader';
import CountryPickerBottomSheet, {
  DEFAULT_COUNTRIES,
} from '../../components/countryPickerBottomSheet';
import InputBox from '../../components/inputBox';

/**
 * LoginScreen
 * Tailwind/NativeWind UI matching cleanz24app structure.
 */
function LoginScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [selectedCountry, setSelectedCountry] = useState(
    DEFAULT_COUNTRIES.find((c) => c.name === 'India') || DEFAULT_COUNTRIES[0],
  );
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleForgotPassword = () => {
    if (!phoneNumber.trim()) {
      setPhoneError('Please enter your phone number to reset password');
      return;
    }
    if (phoneNumber.trim().length < 6) {
      setPhoneError('Please enter a valid phone number');
      return;
    }
    setPhoneError('');
    const fullPhone = `${selectedCountry.code} ${phoneNumber.trim()}`;
    navigation?.navigate?.('Otp', {
      phone: fullPhone,
      isForgotPassword: true,
      isRegistration: false,
    });
  };

  const handleLogin = () => {
    let valid = true;
    if (!phoneNumber.trim()) {
      setPhoneError('Please enter your phone number');
      valid = false;
    } else if (phoneNumber.trim().length < 6) {
      setPhoneError('Please enter a valid phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!password) {
      setPasswordError('Please enter your password');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      const fullPhone = `${selectedCountry.code} ${phoneNumber.trim()}`;
      console.log('Signing in with phone & password:', fullPhone, password);
      navigation?.navigate?.('MainTabs');
    }
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
              <Text className="font-manrope-extrabold text-[30px] text-gray-900 mb-2 pr-1.5">
                Sign In
              </Text>
              <Text className="font-manrope text-sm leading-[22px] text-gray-500 pr-1.5">
                Welcome back! Enter your phone and password to continue.
              </Text>
            </View>

            <View className="mt-2">
              <InputBox
                label="Phone Number"
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  if (text.length > 0) setPhoneError('');
                }}
                error={!!phoneError}
                errorMessage={phoneError}
                leftComponent={
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsPickerVisible(true)}
                    className="flex-row items-center justify-center rounded-2xl bg-white px-3.5 h-14 border border-gray-200">
                    <Text className="text-xl mr-1.5">{selectedCountry.flag}</Text>
                    <Text className="font-manrope-semibold text-xs leading-4 text-gray-800 mr-1 pr-1">
                      ({selectedCountry.code})
                    </Text>
                    <Icon name="chevron-down" size={14} color="#6B7280" />
                  </TouchableOpacity>
                }
              />

              <InputBox
                label="Password"
                placeholder="Enter your password"
                iconName="lock-closed-outline"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (text) setPasswordError('');
                }}
                error={!!passwordError}
                errorMessage={passwordError}
                onSubmitEditing={handleLogin}
                returnKeyType="done"
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

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleForgotPassword}
                className="self-end mt-1 mb-2">
                <Text
                  className="font-manrope-bold text-xs leading-[18px] underline pr-1"
                  style={{ color: colours.textPrimary }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-8 mb-4">
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleLogin}
              className="w-full rounded-2xl h-14 items-center justify-center mb-4"
              style={{ backgroundColor: colours.primary }}>
              <Text
                className="font-manrope-bold text-base leading-[22px] pr-1"
                style={{ color: colours.white }}>
                Sign In
              </Text>
            </TouchableOpacity>

            <Text className="font-manrope text-sm leading-[22px] text-gray-500 text-center pr-1">
              Don't have an account?{' '}
              <Text
                className="font-manrope-bold text-sm leading-[22px]"
                style={{ color: colours.textPrimary }}
                onPress={() => navigation?.navigate?.('Register')}>
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <CountryPickerBottomSheet
        visible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onSelectCountry={(country) => setSelectedCountry(country)}
        selectedCountry={selectedCountry}
      />
    </View>
  );
}

export default LoginScreen;
