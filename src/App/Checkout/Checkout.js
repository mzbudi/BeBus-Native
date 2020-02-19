import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
  color,
  WhiteScrollView,
  PrimaryButton
} from '../../Public/components/Layout';
import { Toast } from '../../Public/components/Toast';

import { networkcheck } from '../../Public/helper/networkcheck';
import { actionBookingRequest } from '../../Public/redux/action/booking';
import {
  findBusTicket,
  getBusDetail
} from '../../Public/redux/action/schedule';

const Checkout = props => {
  const {
    auth,
    schedule,
    navigation,
    bookingRequest,
    getBusTicket,
    scheduleDetail
  } = props;
  const { selection } = navigation.state.params;

  const handleSubmit = async () => {
    if (auth.data.token) {
      if (selection.length < 1) {
        Toast('You must select select your seat numbers');
      } else {
        await scheduleDetail({ id: schedule.busDetail.schedule_id }).then(
          async ({ value }) => {
            const promises = selection.map(async s => {
              // console.log(data);
              // console.log(
              //   String(schedule.busDetail.claimed_seats)
              //     .split(',')
              //     // .map(Number)
              //     .includes(s.toString())
              // );
              // console.log(
              //   String(schedule.busDetail.claimed_seats)
              //     .split(',')
              //     .map(Number)
              // );
              // console.log(s);
              if (
                await String(value.claimed_seats)
                  .split(',')
                  // .map(Number)
                  .includes(s.toString())
              ) {
                Toast('Seat is not available.');
              } else {
                const payload = {
                  seat_number: s,
                  user_id: auth.data.user_id,
                  schedule_id: schedule.busDetail.schedule_id
                };
                navigation.navigate('Checkout', { selection });
                try {
                  await bookingRequest({ payload }).then(async data => {
                    await getBusTicket({ minAvailableSeats: schedule.qty });
                    Toast('Booking success.');
                    navigation.navigate('Payment', {
                      paymentUrl: data.value.paymentUrl
                    });
                  });
                } catch (error) {
                  console.log(error);
                  networkcheck();
                  if (response && response.error) {
                    Toast(response.error);
                  }
                }
              }
            });
            await Promise.all(promises);
          }
        );
      }
    } else {
      Toast('You must login to continue.');
    }
  };

  return (
    <WhiteScrollView>
      <ListItem
        bottomDivider
        title="CONTACT INFORMATION"
        containerStyle={styles.listTitle}
        titleProps={{
          style: {
            color: '#666666'
          }
        }}
      />
      <ListItem
        topDivider
        bottomDivider
        title="Name"
        contentContainerStyle={styles.listContentContainer}
        rightTitle={auth.data.user_name}
        rightContentContainerStyle={styles.listRightContentContainer}
      />
      <ListItem
        bottomDivider
        title="BOOKING DETAIL"
        containerStyle={styles.listTitle}
        titleProps={{
          style: {
            color: '#666666'
          }
        }}
      />
      <ListItem
        topDivider
        bottomDivider
        title="Quantity"
        contentContainerStyle={styles.listContentContainer}
        rightTitle={selection.length}
        rightContentContainerStyle={styles.listRightContentContainer}
      />
      <ListItem
        topDivider
        bottomDivider
        title="Price"
        contentContainerStyle={styles.listContentContainer}
        rightTitle={schedule.busDetail.schedule_price}
        rightContentContainerStyle={styles.listRightContentContainer}
      />
      <ListItem
        topDivider
        bottomDivider
        title="Seat Numbers"
        contentContainerStyle={styles.listContentContainer}
        rightTitle={selection.sort((a, b) => a - b).join(', ')}
        rightContentContainerStyle={styles.listRightContentContainer}
      />
      <ListItem
        topDivider
        bottomDivider
        title="Total"
        contentContainerStyle={styles.listContentContainer}
        rightTitle={schedule.busDetail.schedule_price * selection.length}
        rightContentContainerStyle={styles.listRightContentContainer}
      />
      <ListItem
        containerStyle={styles.listItemContainer}
        title={
          <PrimaryButton title="Continue" onPress={() => handleSubmit()} />
        }
      />
    </WhiteScrollView>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    flex: 0.4
  },
  listRightContentContainer: {
    flex: 0.6,
    alignItems: 'flex-start'
  },
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
    auth: state.auth,
    schedule: state.schedule
  };
};

const mapDispatchToProps = dispatch => ({
  bookingRequest: payload => dispatch(actionBookingRequest(payload)),
  getBusTicket: payload => dispatch(findBusTicket(payload)),
  scheduleDetail: payload => dispatch(getBusDetail(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
