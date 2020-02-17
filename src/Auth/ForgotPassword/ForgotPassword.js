import React from 'react';
// import { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
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
  newPassword: '',
  retypeNewPassword: ''
};

const ForgotPassword = props => {
  const {
    getVerificationCodeRequest,
    resetPasswordRequest,
    navigation
  } = props;
  // const [timer, setTimer] = useState(0);
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
      await getVerificationCodeRequest(payload).then(({ value }) => {
        if (value && value.message) {
          Toast(value.message);
        }
      });
    } catch ({ response }) {
      if (response && response.data.error) {
        Toast(response.data.error);
      }
    }
  };

  const onSubmit = async () => {
    const { newPassword, retypeNewPassword, verificationCode } = getValues();
    const payload = {
      password: newPassword,
      rePassword: retypeNewPassword,
      resetKey: verificationCode
    };
    try {
      await resetPasswordRequest(payload).then(() => {
        Toast('Your password has been changed.');
        navigation.navigate('AuthLogin');
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
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <Input
            inputContainerStyle={styles.inputContainer}
            placeholder="New Password"
            ref={register({ name: 'newPassword' })}
            errorMessage={errors.newPassword ? errors.newPassword.message : ''}
            onChangeText={handleChange('newPassword')}
            secureTextEntry
          />
        }
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <Input
            inputContainerStyle={styles.inputContainer}
            placeholder="Re-type new Password"
            ref={register({ name: 'retypeNewPassword' })}
            errorMessage={
              errors.retypeNewPassword ? errors.retypeNewPassword.message : ''
            }
            onChangeText={handleChange('retypeNewPassword')}
            secureTextEntry
          />
        }
      />
      <ListDivider />
      <ListDivider />
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <PrimaryButton title="Submit" onPress={handleSubmit(onSubmit)} />
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
    dispatch(actionGetVerificationCodeRequest(payload)),
  resetPasswordRequest: payload => dispatch(actionResetPasswordRequest(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
