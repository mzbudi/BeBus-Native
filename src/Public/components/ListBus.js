import React, { Component, Fragment } from 'react';
import { Text } from 'react-native';
import moment from 'moment';

class ListBus extends Component {
  render() {
    const { scheduleData } = this.props;
    return (
      <Fragment>
        <Text style={styles.fontBold}>Bus Name : {scheduleData.bus_name}</Text>
        <Text style={styles.fontBold}>
          Departure :{' '}
          {moment(scheduleData.schedule_departure_time).format(
            'MM-DD-YYYY h:mm:ss a'
          )}
        </Text>
        <Text style={styles.fontBold}>
          Arival : {moment(scheduleData.schedule_arrival_time).format('LLL')}
        </Text>
        <Text style={styles.fontBold}>
          Capacity : {scheduleData.bus_capacity}
        </Text>
        <Text style={styles.fontBold}>
          Claimed Seat : {scheduleData.schedule_claimed_seat}
        </Text>
        <Text style={styles.fontBold}>
          Price : {scheduleData.schedule_price}
        </Text>
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
