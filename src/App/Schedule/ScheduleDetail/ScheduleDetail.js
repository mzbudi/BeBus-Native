import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
const el = React.createElement;

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  color,
  WhiteScrollView,
  PrimaryButton
} from '../../../Public/components/Layout';
import { Toast } from '../../../Public/components/Toast';

import { actionBookingRequest } from '../../../Public/redux/action/booking';
import { findBusTicket } from '../../../Public/redux/action/schedule';

const RenderSeat = ({ layout, dataSeats, selection, handleSelect }) => {
  const busLayout = layout.split('-').map(Number);
  const perRow = busLayout.reduce((a, b) => a + b, 0);
  const leftRow = busLayout[0];
  // const rightRow = busLayout[1];

  const claimedSeats = dataSeats.claimed_seats
    ? dataSeats.claimed_seats.split(',').map(Number)
    : '';
  const seatArray = [
    ...Array((dataSeats.bus_capacity ? dataSeats.bus_capacity : 0) + 1).keys()
  ].slice(1);
  const seatLayout = seatArray
    .map((e, i) => {
      return i % perRow === 0 ? seatArray.slice(i, i + perRow) : null;
    })
    .filter(e => {
      return e;
    });

  const seatStatus = seatLayout.map(row => {
    return row.map(number => {
      if (claimedSeats.includes(number)) {
        return { number: number, isReserved: true };
      } else {
        return { number: number, isReserved: false };
      }
    });
  });

  return el(
    View,
    {
      style: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 8,
        margin: 16
      }
    },
    [
      el(View, { style: { marginHorizontal: 4, marginBottom: 8 } }, [
        el(
          View,
          {
            style: {
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2
            }
          },
          [
            el(
              View,
              {
                style: {
                  borderWidth: 1,
                  backgroundColor: color.Primary,
                  width: 15,
                  height: 15
                }
              },
              []
            ),
            el(Text, { style: { fontWeight: 'bold' } }, ' Reserved')
          ]
        ),
        el(
          View,
          {
            style: {
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2
            }
          },
          [
            el(
              View,
              {
                style: {
                  borderWidth: 1,
                  backgroundColor: '#47c61e',
                  width: 15,
                  height: 15
                }
              },
              []
            ),
            el(Text, { style: { fontWeight: 'bold' } }, ' Selected')
          ]
        ),
        el(
          View,
          {
            style: {
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2
            }
          },
          [
            el(
              View,
              {
                style: {
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                  width: 15,
                  height: 15
                }
              },
              []
            ),
            el(Text, { style: { fontWeight: 'bold' } }, ' Available')
          ]
        )
      ]),
      seatStatus.map((row, i) => {
        return el(
          View,
          {
            key: i,
            style: {
              flex: 1,
              flexDirection: 'row'
            }
          },
          row.map(seat => {
            return [
              el(
                View,
                {
                  key: seat,
                  style: {
                    flex: 1 / (perRow + 1)
                  }
                },
                el(
                  seat.isReserved ? View : TouchableOpacity,
                  {
                    onPress: () => {
                      handleSelect(seat.number);
                    },
                    activeOpacity: 0.5,
                    style: {
                      elevation: 2,
                      borderWidth: 1,
                      borderRadius: 4,
                      marginHorizontal: 4,
                      marginVertical: 8,
                      paddingVertical: 8,
                      alignItems: 'center',
                      ...(seat.isReserved
                        ? {
                            backgroundColor: color.Primary,
                            borderColor: '#b40c23'
                          }
                        : selection.includes(seat.number)
                        ? { backgroundColor: '#47c61e', borderColor: '#2fa10b' }
                        : {
                            backgroundColor: '#ffffff',
                            borderColor: '#cccccc'
                          })
                    }
                  },
                  el(
                    Text,
                    {
                      style: {
                        fontWeight: 'bold',
                        ...(seat.isReserved
                          ? { color: color.TextSecondary }
                          : selection.includes(seat.number)
                          ? { color: color.TextSecondary }
                          : {})
                      }
                    },
                    seat.number
                  )
                )
              ),
              (seat.number % perRow) % perRow === leftRow
                ? el(
                    View,
                    {
                      style: {
                        flex: 1 / (perRow + 1)
                      }
                    },
                    []
                  )
                : null
            ];
          })
        );
      })
    ]
  );
};

const ScheduleDetail = props => {
  const { auth, schedule, bookingRequest } = props;
  const [selection, setSelection] = useState([]);

  const handleSelect = number => {
    const newSelection = selection.includes(number)
      ? selection.filter(i => {
          return i !== number;
        })
      : selection.length < props.schedule.qty
      ? [...selection, number]
      : selection;
    setSelection([...newSelection]);
  };

  const handleSubmit = async () => {
    if (auth.data.token) {
      if (selection.length < 1) {
        Toast('You must select select your seat numbers');
      } else {
        const promises = selection.map(async s => {
          // console.log(s);
          const payload = {
            seat_number: s,
            user_id: auth.data.user_id,
            schedule_id: schedule.busDetail.schedule_id
          };
          console.log(payload);
          try {
            await bookingRequest({ payload });
          } catch (error) {
            console.log(error.response);
          }
        });
        await Promise.all(promises);
      }
    } else {
      Toast('You must login to continue.');
    }
  };

  // const onSubmit = async () => {
  //   // const { name, email, phone } = getValues();
  //   // const payload = {
  //   //   name,
  //   //   email,
  //   //   phone,
  //   //   ...(userPhoto ? { photo: userPhoto } : {})
  //   // };
  //   // try {
  //   //   await changeContactInfo({ payload, token, id }).then(() => {
  //   //     Toast('Contact information has been updated.');
  //   //     navigation.navigate('Account');
  //   //   });
  //   // } catch ({ response }) {
  //   //   networkcheck();
  //   //   if (response && response.data.error) {
  //   //     Toast(response.data.error);
  //   //   }
  //   // }
  // };
  // render() {
  // const { navigation } = this.props;
  const { busDetail } = props.schedule;
  // const { busDetail } = this.props.schedule;
  const departure =
    moment(busDetail.schedule_departure_time).format('hh:mmA') +
    ', ' +
    busDetail.schedule_departure_station_name;
  const arrival =
    moment(busDetail.schedule_arrival_time).format('hh:mmA') +
    ', ' +
    busDetail.schedule_arrival_station_name;
  const departure_date = moment(busDetail.schedule_departure_time).format(
    'ddd, MMM DD, YYYY'
  );
  const departure_time = moment(busDetail.schedule_departure_time).format(
    'hh:mmA'
  );
  const arrival_time = moment(busDetail.schedule_arrival_time).format('hh:mmA');

  return (
    <WhiteScrollView>
      {props.schedule.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Fragment>
          <View style={{ padding: 16 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#dddddd',
                borderRadius: 8,
                overflow: 'hidden'
              }}>
              <ListItem
                containerStyle={styles.listContainer}
                bottomDivider
                title={departure_date}
                rightTitleStyle={{
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: 14
                }}
                rightTitle={busDetail.bus_name}
                rightContentContainerStyle={styles.listRightContentContainer}
              />
              <ListItem
                containerStyle={styles.listContainer}
                title={departure_time}
                titleStyle={{ fontWeight: 'bold' }}
                contentContainerStyle={styles.listContentContainer}
                rightTitle={
                  busDetail.schedule_departure_city_name +
                  ', ' +
                  busDetail.schedule_departure_station_name
                }
                rightContentContainerStyle={styles.listRightContentContainer}
              />
              <ListItem
                containerStyle={styles.listContainer}
                titleStyle={{ fontWeight: 'bold' }}
                bottomDivider
                title={arrival_time}
                contentContainerStyle={styles.listContentContainer}
                rightTitle={
                  busDetail.schedule_arrival_city_name +
                  ', ' +
                  busDetail.schedule_arrival_station_name
                }
                rightContentContainerStyle={styles.listRightContentContainer}
              />
            </View>
          </View>
          <ListItem
            topDivider
            bottomDivider
            title="Price"
            contentContainerStyle={styles.listContentContainer}
            rightTitle={busDetail.schedule_price}
            rightContentContainerStyle={styles.listRightContentContainer}
          />
          <ListItem
            bottomDivider
            title="Departure"
            contentContainerStyle={styles.listContentContainer}
            rightTitle={departure}
            rightContentContainerStyle={styles.listRightContentContainer}
          />
          <ListItem
            bottomDivider
            title="Arrival"
            contentContainerStyle={styles.listContentContainer}
            rightTitle={arrival}
            rightContentContainerStyle={styles.listRightContentContainer}
          />
          <ListItem
            containerStyle={styles.listItemContainer}
            title={
              <PrimaryButton title="Booking" onPress={() => handleSubmit()} />
            }
          />
          {/*<RenderSeat
          layout="2-2"
          dataSeats={busDetail}
          selection={this.state.selection}
          handleSelect={this.handleSelect}
        />*/}
          <RenderSeat
            layout="2-2"
            dataSeats={busDetail}
            selection={selection}
            handleSelect={handleSelect}
          />
        </Fragment>
      )}
    </WhiteScrollView>
  );
  // }
};

const styles = StyleSheet.create({
  listContentContainer: {
    flex: 0.25
  },
  listRightContentContainer: {
    flex: 0.75,
    alignItems: 'flex-start'
  },
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16
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
  getBusTicket: payload => dispatch(findBusTicket(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail);
