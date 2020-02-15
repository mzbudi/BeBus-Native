import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { ListItem, Input } from 'react-native-elements';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  ListDivider,
  PrimaryButton,
  color
} from '../../Public/components/Layout';

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
  phone: yup.number().typeError('Invalid number')
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
  const { postRegister, navigation } = props;

  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: RegisterSchema
  });

  const onSubmit = async () => {
    const { username, password, name, email, phone } = getValues();
    const payload = {
      username,
      password,
      name,
      email,
      phone
    };
    await postRegister(payload);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <Input
            inputContainerStyle={styles.inputContainer}
            placeholder="Username"
            ref={register({ name: 'username' })}
            errorMessage={errors.username ? errors.username.message : ''}
            onChangeText={text => setValue('username', text, true)}
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
            onChangeText={text => setValue('password', text, true)}
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
            onChangeText={text => setValue('retypePassword', text, true)}
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
            onChangeText={text => setValue('email', text, true)}
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
            onChangeText={text => setValue('name', text, true)}
          />
        }
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <Input
            inputContainerStyle={styles.inputContainer}
            placeholder="Phone"
            ref={register({ name: 'phone' })}
            errorMessage={errors.phone ? errors.phone.message : ''}
            onChangeText={text => setValue('phone', text, true)}
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
      <Text>Already have an account?</Text>
      <Text
        onPress={() => navigation.navigate('Login')}
        style={styles.textPrimary}>
        Login
      </Text>
    </ScrollView>
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
    backgroundColor: '#ffffff',
    height: '100%'
  },
  textPrimary: {
    color: color.Primary
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  postRegister: payload => dispatch(actionPostRegister(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);