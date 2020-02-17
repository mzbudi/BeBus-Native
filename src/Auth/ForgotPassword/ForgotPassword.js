import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Input } from 'react-native-elements';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  ListDivider,
  PrimaryButton,
  WhiteScrollView
} from '../../Public/components/Layout';
import { Toast } from '../../Public/components/Toast';

import { networkcheck } from '../../Public/helper/networkcheck';
import {
  actionGetVerificationCodeRequest,
  actionResetPasswordRequest
} from '../../Public/redux/action/auth';

const ForgotPasswordSchema = yup.object().shape({
  email: yup.lazy(value => {
    if (value !== undefined && value !== '') {
      return yup
        .string()
        .email()
        .required();
    } else {
      return yup.mixed().notRequired();
    }
  }),
  newPassword: yup.string().required(),
  retypeNewPassword: yup
    .string()
    .required()
    .test('password-match', 'newPassword does not match.', function(value) {
      return this.parent.newPassword === value;
    })
});

const defaultValues = {
  oldPassword: '',
  newPassword: '',
  retypeNewPassword: ''
};

const ForgotPassword = props => {
  const { getVerificationCodeRequest } = props;
  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: ForgotPasswordSchema
  });

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const handleGetCode = async () => {
    const { email } = getValues();
    const payload = {
      email
    };
    try {
      await getVerificationCodeRequest(payload).then(res => {
        console.log(res);
      });
    } catch ({ response }) {
      if (response && response.data.error) {
        Toast(response.data.error);
      }
    }
  };

  return (
    <WhiteScrollView>
      <ListDivider />
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
            placeholder="Verification Code"
            ref={register({ name: 'verificationCode' })}
            onChangeText={handleChange('verificationCode')}
          />
        }
        rightTitle={
          <PrimaryButton title="Get Code" onPress={() => handleGetCode()} />
        }
      />
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
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  getVerificationCodeRequest: payload =>
    dispatch(actionGetVerificationCodeRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
