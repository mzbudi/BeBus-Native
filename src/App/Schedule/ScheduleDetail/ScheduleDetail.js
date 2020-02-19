import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { ListItem } from 'react-native-elements';
import moment from 'moment';
const el = React.createElement;

import {
  color,
  WhiteScrollView,
  PrimaryButton,
  ListDivider
} from '../../../Public/components/Layout';
import { Toast } from '../../../Public/components/Toast';

import { formatRupiah } from '../../../Public/helper/parseprice';

import { networkcheck } from '../../../Public/helper/networkcheck';
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
      seatStatus.map((row, iRow) => {
        return el(
          View,
          {
            key: iRow.toString(),
            style: {
              flex: 1,
              flexDirection: 'row'
            }
          },
          row.map((seat, iSeat) => {
            // console.log(iRow + '-' + iSeat);
            return [
              el(
                View,
                {
                  key: iRow + '-' + iSeat,
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
  const { auth, schedule, navigation, getBusTicket } = props;
  const [selection, setSelection] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSelect = number => {
    const newSelection = selection.includes(number)
      ? selection.filter(i => {
          return i !== number;
        })
      : selection.length < schedule.qty
      ? [...selection, number]
      : selection;
    setSelection([...newSelection]);
  };

  const handleSubmit = async () => {
    setActionLoading(true);
    if (auth.data.token) {
      if (selection.length < 1) {
        Toast('You must select your seat numbers');
        setActionLoading(false);
      } else {
        try {
          await getBusTicket({}).then(async ({}) => {
            const promises = selection.map(async s => {
              if (
                String(schedule.busDetail.claimed_seats)
                  .split(',')
                  .map(Number)
                  .includes(s)
              ) {
                Toast('Seat is not available.');
                setActionLoading(false);
              } else {
                navigation.navigate('Checkout', { selection });
                setActionLoading(false);
              }
            });
            await Promise.all(promises);
          });
        } catch (error) {
          networkcheck();
          setActionLoading(false);
        }
      }
    } else {
      Toast('You must login to continue.');
      setActionLoading(false);
    }
  };

  const { busDetail } = props.schedule;
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

  return schedule.isLoading ? (
    <View style={styles.padding10}>
      <View style={styles.padding10}>
        <ActivityIndicator size="large" color={color.Primary} />
      </View>
    </View>
  ) : (
    <Fragment>
      <WhiteScrollView>
        <View style={styles.padding10}>
          <View style={styles.scheduleCard}>
            <ListItem
              containerStyle={styles.listContainer}
              bottomDivider
              title={departure_date}
              rightTitleStyle={styles.textBoldRed}
              rightTitle={busDetail.bus_name}
              rightContentContainerStyle={styles.listRightContentContainer}
            />
            <ListItem
              containerStyle={styles.listContainer}
              title={departure_time}
              titleStyle={styles.textBold}
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
              titleStyle={styles.textBold}
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
          bottomDivider
          title="TICKET DETAIL"
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
          title="Price"
          contentContainerStyle={styles.listContentContainer}
          rightTitle={formatRupiah(busDetail.schedule_price, 'Rp. ')}
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
        <ListDivider />
        <ListDivider />
        <ListItem
          bottomDivider
          title="PICK SEAT NUMBERS"
          containerStyle={styles.listTitle}
          titleProps={{
            style: {
              color: '#666666'
            }
          }}
        />
        <RenderSeat
          layout="2-2"
          dataSeats={busDetail}
          selection={selection}
          handleSelect={handleSelect}
        />
      </WhiteScrollView>
      <View>
        <ListItem
          containerStyle={styles.listItemContainer}
          title={
            <PrimaryButton
              disabled={actionLoading}
              loading={actionLoading}
              title="Continue Booking"
              onPress={() => handleSubmit()}
            />
          }
        />
      </View>
    </Fragment>
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
  listItemContainer: {
    borderTopWidth: 1,
    borderColor: '#dddddd'
  },
  listContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  listTitle: {
    backgroundColor: '#eaefef'
  },
  textBold: { fontWeight: 'bold' },
  textBoldRed: {
    color: color.Primary,
    fontWeight: 'bold',
    fontSize: 14
  },
  scheduleCard: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    overflow: 'hidden'
  },
  padding10: {
    padding: 10
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
