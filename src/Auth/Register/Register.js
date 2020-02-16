import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, View } from 'react-native';
import { ListItem, Input } from 'react-native-elements';

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
import { actionPostRegister } from '../../Public/redux/action/auth';

const RegisterSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  retypePassword: yup
    .string()
    .required()
    .test('password-match', 'Password does not match.', function(value) {
      return this.parent.password === value;
    }),
  email: yup
    .string()
    .email()
    .required(),
  name: yup.string().required(),
  phone: yup.lazy(value => {
    if (value !== undefined && value !== '') {
      return yup.number().typeError('invalid number');
    } else {
      return yup.mixed().notRequired();
    }
  })
});

const defaultValues = {
  username: '',
  password: '',
  retypePassword: '',
  name: '',
  email: '',
  phone: ''
};

const Register = props => {
  const { auth, postRegister, navigation } = props;
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: RegisterSchema
  });

  if (auth.data.token) {
    navigation.navigate('Account');
  }

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const onSubmit = async () => {
    const { username, password, name, email, phone } = getValues();
    const payload = {
      username,
      password,
      name,
      email,
      phone
    };
    try {
      await postRegister(payload).then(() => {
        navigation.navigate('Login');
      });
    } catch ({ response }) {
      networkcheck();
      if (response && response.data.error) {
        Toast(response.data.error);
      }
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
              secureTextEntry
            />
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Re-type Password"
              ref={register({ name: 'retypePassword' })}
              errorMessage={
                errors.retypePassword ? errors.retypePassword.message : ''
              }
              onChangeText={handleChange('retypePassword')}
              secureTextEntry
            />
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Email Address"
              ref={register({ name: 'email' })}
              errorMessage={errors.email ? errors.email.message : ''}
              onChangeText={handleChange('email')}
            />
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Name"
              ref={register({ name: 'name' })}
              errorMessage={errors.name ? errors.name.message : ''}
              onChangeText={handleChange('name')}
            />
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Phone (Optional)"
              ref={register({ name: 'phone' })}
              errorMessage={errors.phone ? errors.phone.message : ''}
              onChangeText={handleChange('phone')}
            />
          }
        />
        <ListDivider />
        <ListDivider />
        <ListDivider />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <PrimaryButton
              title="Create Account"
              onPress={handleSubmit(onSubmit)}
            />
          }
        />
        <ListDivider />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Text>
              Already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('Login')}
                style={styles.textPrimary}>
                Login
              </Text>
            </Text>
          }
        />
      </View>
    </WhiteScrollView>
  );
};

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
  textPrimary: {
    color: color.Primary
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  postRegister: payload => dispatch(actionPostRegister(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
