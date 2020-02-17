import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { ListItem, Input, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  ListDivider,
  PrimaryButton,
  WhiteScrollView,
  color
} from '../../../Public/components/Layout';
import { Toast } from '../../../Public/components/Toast';

import { networkcheck } from '../../../Public/helper/networkcheck';
import { actionChangeContactInfo } from '../../../Public/redux/action/account';

const ContactInfoSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  phone: yup.lazy(value => {
    if (value && value !== '' && value !== 'null' && value !== null) {
      return yup.number().typeError('invalid number');
    } else {
      return yup.mixed().notRequired();
    }
  })
});

const defaultValues = props => {
  const { user_name, user_email, user_phone, user_photo } = props.auth.data;
  return {
    name: user_name,
    email: user_email,
    phone: user_phone ? user_phone : '',
    ...(user_photo ? { photo: user_photo } : {})
  };
};

const ContactInfo = props => {
  const { auth, changeContactInfo, navigation } = props;
  const token = auth.data && auth.data.token ? auth.data.token : undefined;
  const id = auth.data && auth.data.user_id ? auth.data.user_id : undefined;

  const [avatar, setAvatar] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    defaultValues: defaultValues(props),
    validationSchema: ContactInfoSchema
  });

  const handleChange = field => {
    return text => setValue(field, text, true);
  };

  const options = {
    title: 'Select Avatar Image',
    quality: 0.8,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const uploadImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        setAvatar(null);
        setUserPhoto(null);
      } else if (response.error) {
        Toast(response.error);
      } else {
        const source = { uri: response.uri };
        if (response.fileSize > 1 * 1024 * 1024) {
          Toast('Image file size is too large. (max: 1mb)');
        } else {
          setAvatar(source);
          setUserPhoto({
            uri: response.uri,
            type: response.type,
            name: response.fileName
          });
        }
      }
    });
  };

  const onSubmit = async () => {
    const { name, email, phone } = getValues();
    const payload = {
      name,
      email,
      phone,
      ...(userPhoto ? { photo: userPhoto } : {})
    };
    try {
      await changeContactInfo({ payload, token, id }).then(() => {
        Toast('Contact information has been updated.');
        navigation.navigate('Account');
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
      <ListDivider />
      <View style={styles.headerContainer}>
        <Avatar
          {...(auth.data.user_name
            ? { title: auth.data.user_name[0].toUpperCase() }
            : {})}
          size="xlarge"
          source={
            avatar && avatar !== ''
              ? avatar
              : auth.data.user_photo
              ? { uri: auth.data.user_photo }
              : null
          }
          editButton={{
            size: 40,
            color: '#ffffff',
            iconStyle: {
              fontSize: 25
            },
            style: {
              borderWidth: 3,
              borderColor: '#ffffff',
              elevation: 2,
              backgroundColor: color.Primary
            }
          }}
          activeOpacity={0.5}
          rounded
          showEditButton
          onPress={() => uploadImage()}
          containerStyle={styles.avatarContainer}
        />
      </View>
      <ListDivider />
      <View style={styles.mainContainer}>
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <Input
              defaultValue={auth.data.user_name}
              label="Name"
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
              defaultValue={auth.data.user_email}
              label="Email"
              inputContainerStyle={styles.inputContainer}
              placeholder="Email"
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
              defaultValue={auth.data.user_phone}
              label="Phone"
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
            <PrimaryButton title="Save" onPress={handleSubmit(onSubmit)} />
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
  headerContainer: {
    alignItems: 'center'
  },
  avatarContainer: {
    borderWidth: 5,
    borderColor: '#ffffff',
    elevation: 4
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  changeContactInfo: payload => dispatch(actionChangeContactInfo(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInfo);
