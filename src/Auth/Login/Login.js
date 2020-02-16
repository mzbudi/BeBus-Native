import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet } from 'react-native';
import { ListItem, Icon, Text, Input } from 'react-native-elements';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  ListDivider,
  PrimaryButton,
  color
} from '../../Public/components/Layout';

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
    const payload = {
      username,
      password
    };
    await loginRequest(payload).then(() => {
      navigation.navigate('Home');
    });
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <ListDivider />
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <Input
            inputContainerStyle={styles.inputContainer}
            placeholder="Username"
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
        title={<PrimaryButton title="Login" onPress={handleSubmit(onSubmit)} />}
      />
      <ListDivider />
      <ListDivider />
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <PrimaryButton
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
          />
        }
      />
    </ScrollView>
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
    backgroundColor: '#ffffff',
    height: '100%',
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
