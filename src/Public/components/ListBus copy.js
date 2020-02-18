import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

class ListBus extends Component {
  render() {
    const { scheduleData } = this.props;
    return (
      <Fragment>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={styles.fontBold}>Bus Name : </Text>
            <Text style={styles.fontBold}>
              Departure :
              </Text>
            <Text style={styles.fontBold}>
              Arival :
              </Text>
            <Text style={styles.fontBold}>
              Capacity :
              </Text>
            <Text style={styles.fontBold}>
              Claimed Seat :
              </Text>
            <Text style={styles.fontBold}>
              Price :
              </Text>
          </View>
          <View style={{ left: 8 }}>
            <Text style={styles.fontBold}> {scheduleData.bus_name}</Text>
            <Text style={styles.fontBold}>
              {moment(scheduleData.schedule_departure_time).format(
                'MM-DD-YYYY h:mm:ss a'
              )}
            </Text>
            <Text style={styles.fontBold}>
              {moment(scheduleData.schedule_arrival_time).format('MM-DD-YYYY h:mm:ss a')}
            </Text>
            <Text style={styles.fontBold}>
              {scheduleData.bus_capacity}
            </Text>
            <Text style={styles.fontBold}>
              {scheduleData.schedule_claimed_seat}
            </Text>
            <Text style={styles.fontBold}>
              {scheduleData.schedule_price}
            </Text>
          </View>
        </View>
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
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 10
  },
  whiteColor: { backgroundColor: '#ffffff' },
  iconFilter: { right: 16 },
  fontBold: { fontWeight: 'bold' }
};

export default ListBus;
