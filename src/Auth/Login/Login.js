import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { ListItem, Icon, Text, Input } from 'react-native-elements';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  ListDivider,
  PrimaryButton,
  color,
  WhiteScrollView
} from '../../Public/components/Layout';
import { Toast } from '../../Public/components/Toast';

import { networkcheck } from '../../Public/helper/networkcheck';
import { actionLoginRequest } from '../../Public/redux/action/auth';

const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const defaultValues = {
  username: '',
  password: ''
};

const Login = props => {
  const { auth, loginRequest, navigation } = props;
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: LoginSchema
  });

  if (auth.data.token) {
    navigation.navigate('Account');
  }

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const onSubmit = async () => {
    const { username, password } = getValues();
    setIsLoading(true);
    const payload = {
      username,
      password
    };
    try {
      await loginRequest(payload).then(() => {
        navigation.navigate('Home');
        setIsLoading(false);
      });
    } catch ({ response }) {
      networkcheck();
      if (response && response.data.error) {
        Toast(response.data.error);
      }
      setIsLoading(false);
    }
  };

  return (
    <WhiteScrollView>
      <View style={styles.mainContainer}>
        <ListDivider />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Username / Email"
              ref={register({ name: 'username' })}
              errorMessage={errors.username ? errors.username.message : ''}
              onChangeText={handleChange('username')}
            />
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Password"
              ref={register({ name: 'password' })}
              errorMessage={errors.password ? errors.password.message : ''}
              onChangeText={handleChange('password')}
              rightIcon={
                <Icon
                  name={visible ? 'visibility-off' : 'visibility'}
                  size={25}
                  type="material-ui"
                  onPress={() => toggleVisible()}
                />
              }
              secureTextEntry={visible}
            />
          }
        />
        <ListItem
          rightElement={
            <Text onPress={() => navigation.navigate('ForgotPassword')}>
              Forgot Password?
            </Text>
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <PrimaryButton
              loading={isLoading}
              title="Login"
              onPress={handleSubmit(onSubmit)}
            />
          }
        />
        <ListDivider />
        <ListDivider />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <PrimaryButton
              title="Create Account"
              onPress={() =>
                navigation.state.routeName === 'AuthLogin'
                  ? navigation.navigate('AuthRegister')
                  : navigation.navigate('Register')
              }
            />
          }
        />
      </View>
    </WhiteScrollView>
  );
};

Login.navigationOptions = ({ navigation }) => ({
  headerRight: () =>
    navigation.state.routeName === 'AuthLogin' ? (
      <Text
        style={styles.headerRightText}
        onPress={() => navigation.navigate('Home')}>
        Skip
      </Text>
    ) : null
});

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: '#bababa'
  },
  listItemContainer: {
    paddingVertical: 4,
    marginHorizontal: 4,
    paddingHorizontal: 4
  },
  mainContainer: {
    paddingHorizontal: 4
  },
  headerRightText: {
    color: color.TextSecondary,
    fontSize: 16,
    marginHorizontal: 16
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  loginRequest: payload => dispatch(actionLoginRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
