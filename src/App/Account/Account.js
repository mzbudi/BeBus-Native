import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

import { color, MainContainer } from '../../Public/components/Layout';

import { actionLogoutRequest } from '../../Public/redux/action/auth';

class Account extends Component {
  handleLogout = () => {
    this.props.logoutRequest();
    this.props.navigation.navigate('Auth');
  };

  render() {
    const { auth, navigation } = this.props;
    return (
      <MainContainer>
        <ListItem
          containerStyle={styles.listItemAvatar}
          leftAvatar={{
            rounded: true,
            size: 50,
            source: auth.data.user_photo
              ? { uri: auth.data.user_photo }
              : require('../../../assets/images/avatar-placeholder.jpg'),
            containerStyle: styles.avatarContainer
          }}
          {...(auth.data.token && auth.data.user_name
            ? {
                title: auth.data.user_name,
                titleStyle: styles.fontWhite,
                subtitle: auth.data.user_email,
                subtitleStyle: styles.fontWhite
              }
            : {
                title: 'Login/Register',
                titleStyle: styles.fontWhite,
                titleProps: { onPress: () => navigation.navigate('Login') }
              })}
        />
        {auth.data.token ? (
          <Fragment>
            <ListItem
              bottomDivider
              title="MY PROFILE"
              containerStyle={styles.listTitle}
              titleProps={{
                style: {
                  color: '#666666'
                }
              }}
            />
            <ListItem
              bottomDivider
              chevron={{
                color: color.Secondary,
                size: 40,
                padding: 0,
                marginVertical: -12
              }}
              leftIcon={<Icon name="person" type="material" color="#666666" />}
              title="My Contact Informations"
              onPress={() => navigation.navigate('ContactInfo')}
            />
            <ListItem
              bottomDivider
              chevron={{
                color: color.Secondary,
                size: 40,
                padding: 0,
                marginVertical: -12
              }}
              leftIcon={<Icon name="vpn-key" type="material" color="#666666" />}
              title="Change Password"
              onPress={() => navigation.navigate('ChangePassword')}
            />
            <ListItem
              bottomDivider
              chevron={{
                color: color.Secondary,
                size: 40,
                padding: 0,
                marginVertical: -12
              }}
              leftIcon={<Icon name="mail" type="material" color="#666666" />}
              title="My Notifications"
              onPress={() => navigation.navigate('Notification')}
            />
            <ListItem
              bottomDivider
              title="MORE"
              containerStyle={styles.listTitle}
              titleProps={{
                style: {
                  color: '#666666'
                }
              }}
            />
            <ListItem
              bottomDivider
              chevron={{
                color: color.Secondary,
                size: 40,
                padding: 0,
                marginVertical: -12
              }}
              leftIcon={
                <Icon name="exit-to-app" type="material" color="#666666" />
              }
              title="Logout"
              onPress={() => this.handleLogout()}
            />
          </Fragment>
        ) : null}
      </MainContainer>
    );
  }
}

const styles = StyleSheet.create({
  listItemAvatar: {
    backgroundColor: color.Primary,
    paddingTop: 0,
    paddingHorizontal: 16
  },
  avatarContainer: {
    borderColor: '#ffffff',
    borderWidth: 3
  },
  fontWhite: { color: '#ffffff' },
  listTitle: {
    backgroundColor: '#eaefef'
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  logoutRequest: () => dispatch(actionLogoutRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
