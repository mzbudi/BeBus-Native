import React, { Component } from 'react';
import { Text, View } from 'react-native';

class TripDetail extends Component {
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
    return (
      <View style={styles.containerFlex}>
        <View style={styles.flex1}>
          <View style={styles.rowFlexer}>
            <Text style={styles.fontBold}>Booking Id :{234}</Text>
          </View>
          <View style={styles.borderBold} />
          <View style={styles.dataFlexer}>
            <View>
              <Text style={styles.fontBold}>Departure :</Text>
            </View>
            <View>
              <Text>City :</Text>
              <Text>Station :</Text>
              <Text>Date :</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.dataFlexer}>
            <View>
              <Text style={styles.fontBold}>Arrival :</Text>
            </View>
            <View>
              <Text>City :</Text>
              <Text>Station :</Text>
              <Text>Date :</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View style={styles.flexTotal}>
            <View>
              <Text style={styles.fontBold}>Total Passengers:</Text>
              <Text style={styles.fontBold}>Total:</Text>
            </View>
            <View>
              <Text>2</Text>
              <Text style={styles.fontBold}>
                Rp. {this.formatRupiah(400000)}
              </Text>
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

export default TripDetail;