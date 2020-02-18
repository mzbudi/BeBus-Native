import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import moment from 'moment';

import { color, WhiteScrollView } from '../../../Public/components/Layout';
// import { Toast } from '../../../Public/components/Toast';

const el = React.createElement;

const data = {
  schedule_id: 1,
  schedule_departure_station_id: 1,
  schedule_arrival_station_id: 2,
  schedule_price: 50000,
  schedule_departure_time: '2020-02-15T05:43:16.000Z',
  schedule_arrival_time: '2020-02-16T16:43:16.000Z',
  schedule_bus_id: 1,
  bus_id: 1,
  bus_name: 'Harapan Jaya',
  bus_capacity: 24,
  schedule_claimed_seats: '1,2,4,1,5,5,6,6'
};

const RenderSeat = ({
  maxSelect,
  layout,
  dataSeats,
  selection,
  handleSelect
}) => {
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

class ScheduleDetail extends Component {
  state = {
    selection: [],
    data: {}
  };

  handleSelect = number => {
    const { selection } = this.state;
    const newSelection = selection.includes(number)
      ? selection.filter(i => {
          return i !== number;
        })
      : selection.length < 3
      ? [...selection, number]
      : selection;
    this.setState((prevState, currentState) => {
      return {
        selection: [...newSelection]
      };
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <WhiteScrollView>
        <RenderSeat
          maxSelect={3}
          layout="2-2"
          dataSeats={this.props.schedule.busDetail}
          selection={this.state.selection}
          handleSelect={this.handleSelect}
        />
        <ListItem
          bottomDivider
          title="Price"
          contentContainerStyle={{
            borderWidth: 1,
            flex: 0.3
          }}
          rightTitle={data.schedule_price}
          rightContentContainerStyle={{
            borderWidth: 1,
            flex: 0.7,
            alignItems: 'flex-start'
          }}
          onPress={() => navigation.navigate('ContactInfo')}
        />
        <ListItem
          bottomDivider
          title="Departure"
          contentContainerStyle={{ borderWidth: 1, flex: 0.3 }}
          rightTitle={
            moment(data.schedule_departure_time).format('hh:mma') +
            ' ' +
            data.schedule_departure_station_id
          }
          rightContentContainerStyle={{
            borderWidth: 1,
            flex: 0.7,
            alignItems: 'flex-start'
          }}
          onPress={() => navigation.navigate('ContactInfo')}
        />
        <ListItem
          bottomDivider
          title="Arrival"
          contentContainerStyle={{ borderWidth: 1, flex: 0.3 }}
          rightTitle={
            moment(data.schedule_arrival_time).format('hh:mma') +
            ' ' +
            data.schedule_arrival_station_id
          }
          rightContentContainerStyle={{
            borderWidth: 1,
            flex: 0.7,
            alignItems: 'flex-start'
          }}
          onPress={() => navigation.navigate('ContactInfo')}
        />
      </WhiteScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  };
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail);
