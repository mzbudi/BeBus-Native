import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, RefreshControl } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { actionBookingGet } from '../../Public/redux/action/booking';
import { networkcheck } from '../../Public/helper/networkcheck';
import { Toast } from '../../Public/components/Toast';
import { formatRupiah } from '../../Public/helper/parseprice';

import { color } from '../../Public/components/Layout';

class History extends Component {
  state = {
    refreshing: false
  };
  tripDetail = () => {
    this.navigation.navigate('TripDetail');
  };

  componentDidMount() {
    const { getDataBooking, auth } = this.props;
    if (auth.data.user_id !== undefined || auth.data.user_id) {
      const payload = {
        params: {
          user_id: auth.data.user_id
        }
      };
      try {
        getDataBooking(payload);
      } catch ({ response }) {
        networkcheck();
        if (response && response.data.error) {
          Toast(response.data.error);
        }
      }
    }
  }

  _onRefresh = async () => {
    this.setState({
      refreshing: true
    });
    const { getDataBooking, auth } = this.props;
    if (auth.data.user_id !== undefined || auth.data.user_id) {
      const payload = {
        params: {
          user_id: auth.data.user_id
        }
      };
      try {
        await getDataBooking(payload).then(() => {
          this.setState({
            refreshing: false
          });
        });
      } catch ({ response }) {
        networkcheck();
        if (response && response.data.error) {
          Toast(response.data.error);
        }
      }
    }
  };
  render() {
    const { navigation, booking } = this.props;
    return (
      <Fragment>
        {booking.dataBooking.length === 0 ? (
          <Text />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            style={styles.paddingFlatList}
            data={booking.dataBooking}
            keyExtractor={item => item.booking_id}
            renderItem={({ item }) => (
              <ListItem
                bottomDivider
                chevron={{
                  color: color.Secondary,
                  size: 40,
                  padding: 0,
                  marginVertical: -12
                }}
                leftIcon={
                  <Icon name="import-export" type="material" color="green" />
                }
                title={`Booking Number : ${item.booking_number}`}
                subtitle={`Price : ${formatRupiah(
                  item.schedule_price,
                  'Rp. '
                )}`}
                onPress={() => {
                  navigation.navigate('TripDetail', { item });
                }}
              />
            )}
          />
        )}
      </Fragment>
    );
  }
}

const styles = {
  cityName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  border: {
    borderBottomColor: 'grey',
    borderBottomWidth: 4,
    marginHorizontal: 0,
    marginVertical: 10
  },
  borderHistory: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 10,
    width: '100%',
    flex: 1
  },
  whiteColor: { backgroundColor: '#ffffff' },
  paddingFlatList: {
    padding: 16
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    booking: state.booking
  };
};

const mapDispatchToProps = dispatch => ({
  getDataBooking: payload => dispatch(actionBookingGet(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
