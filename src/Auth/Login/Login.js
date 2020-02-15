import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { ListItem, Icon, Input } from 'react-native-elements';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

const defaultValues = {
  username: '',
  password: ''
};

const Login = props => {
  const { navigation } = props;

  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: LoginSchema
  });
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
            rightIcon={
              <Icon name="visibility-off" size={25} type="material-ui" />
            }
          />
        }
      />
      <Text onPress={() => navigation.navigate('Register')}>Register</Text>
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
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
