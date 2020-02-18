import React, { Component, Fragment } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { requestStation } from '../../../Public/redux/action/station';
import moment from 'moment';

class TripDetail extends Component {

  componentDidMount() {
    const { getDataStation, navigation } = this.props
    getDataStation()
  }


  formatRupiah = (angka, prefix) => {
    let number_string = angka.toString().replace(/[^,\d]/g, '');
    let split = number_string.split(',');
    let remains = split[0].length % 3;
    let rupiah = split[0].substr(0, remains);
    let thausand = split[0].substr(remains).match(/\d{3}/gi);

    if (thausand) {
      let separator = remains ? '.' : '';
      rupiah += separator + thausand.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  };
  render() {
    const { navigation, station } = this.props
    const stationDepart = navigation.state.params.item.schedule_departure_station_id;
    const stationArrival = navigation.state.params.item.schedule_arrival_station_id;
    return (
      <View style={styles.containerFlex}>
        <View style={styles.flex1}>
          <View style={styles.rowFlexer}>
            <Text style={styles.fontBold}>Booking Number :{navigation.state.params.item.booking_number}</Text>
            <Text style={styles.fontBold}>Seat Number :{navigation.state.params.item.booking_seat_number}</Text>
          </View>
          <View style={styles.borderBold} />
          <View style={styles.dataFlexer}>
            <View>
              <Text style={styles.fontBold}>Departure : </Text>
            </View>
            <View>
              {this.props.station.data.map((item, i) => {
                if (stationArrival === item.station_id) {
                  return (
                    <Fragment>
                      <Text>City : {item.city_name}</Text>
                      <Text>Station : {item.station_name}</Text>
                    </Fragment>
                  )
                }
              })}
              <Text>Date : {moment(navigation.state.params.item.schedule_departure_time).format(
                'ddd, MMM DD, YYYY'
              )}{' '}</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.dataFlexer}>
            <View>
              <Text style={styles.fontBold}>Arrival :</Text>
            </View>
            <View>
              {this.props.station.data.map((item, i) => {
                if (stationDepart === item.station_id) {
                  return (
                    <Fragment>
                      <Text>City : {item.city_name}</Text>
                      <Text>Station : {item.station_name}</Text>
                    </Fragment>
                  )
                }
              })}
              <Text>Date : {moment(navigation.state.params.item.schedule_arrival_time).format(
                'ddd, MMM DD, YYYY'
              )}{' '}</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.flexTotal}>
            <View>
              <Text style={styles.fontBold}>Total: </Text>
              <Text style={styles.fontBold}>Status: </Text>
            </View>
            <View>
              <Text style={styles.fontBold}>
                Rp. {this.formatRupiah(navigation.state.params.item.schedule_price)}
              </Text>
              <Text style={styles.fontBold}>{navigation.state.params.item.booking_status}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  border: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 10
  },
  borderBold: {
    borderBottomColor: 'grey',
    borderBottomWidth: 3,
    marginHorizontal: 0,
    marginVertical: 10
  },
  containerFlex: {
    backgroundColor: 'white',
    elevation: 15,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 0,
    flexDirection: 'row'
  },
  fontBold: {
    fontWeight: 'bold'
  },
  rowFlexer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flex1: { flex: 1 },
  dataFlexer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    booking: state.booking,
    station: state.station,
    station: state.station
  };
};

const mapDispatchToProps = dispatch => ({
  getDataStation: () => (dispatch(requestStation()))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetail);
