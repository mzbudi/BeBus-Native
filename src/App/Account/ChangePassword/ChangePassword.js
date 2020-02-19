import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem, Input } from 'react-native-elements';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  ListDivider,
  PrimaryButton,
  WhiteScrollView
} from '../../../Public/components/Layout';
import { Toast } from '../../../Public/components/Toast';

import { networkcheck } from '../../../Public/helper/networkcheck';
import { actionChangePassword } from '../../../Public/redux/action/account';

const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required(),
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

const ChangePassword = props => {
  const { auth, changePassword, navigation } = props;
  const token = auth.data && auth.data.token ? auth.data.token : undefined;
  const id = auth.data && auth.data.user_id ? auth.data.user_id : undefined;

  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues,
    validationSchema: ChangePasswordSchema
  });

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const onSubmit = async () => {
    const { oldPassword, newPassword } = getValues();
    const payload = {
      old_password: oldPassword,
      new_password: newPassword
    };
    try {
      await changePassword({ payload, token, id }).then(() => {
        Toast('Your password has been changed.');
        navigation.navigate('Auth');
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
      <View style={styles.mainContainer}>
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="Old Password"
              ref={register({ name: 'oldPassword' })}
              errorMessage={
                errors.oldPassword ? errors.oldPassword.message : ''
              }
              onChangeText={handleChange('oldPassword')}
              secureTextEntry
            />
          }
        />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              inputContainerStyle={styles.inputContainer}
              placeholder="New Password"
              ref={register({ name: 'newPassword' })}
              errorMessage={
                errors.newPassword ? errors.newPassword.message : ''
              }
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
              placeholder="Re-type New Password"
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
        <ListDivider />
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <PrimaryButton title="Submit" onPress={handleSubmit(onSubmit)} />
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
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  changePassword: payload => dispatch(actionChangePassword(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
