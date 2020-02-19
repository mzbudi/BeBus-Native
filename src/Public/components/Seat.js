import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const el = React.createElement;
import { color } from './Layout';

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

  const claimedSeats = dataSeats.claimed_seats.split(',').map(Number);
  const seatArray = [...Array(dataSeats.bus_capacity + 1).keys()].slice(1);
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

export default RenderSeat;
