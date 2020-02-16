import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const DATA = new Array(10).fill({
  id: '1',
  title: '12121',
  title2: 'Bogor, Branang-Siang'
});

import { color } from '../../Public/components/Layout';

class History extends Component {
  tripDetail = () => {
    this.navigation.navigate('TripDetail');
  };
  render() {
    const { navigation } = this.props;
    return (
      <Fragment>
        {/* <Image source={require('../../../assets/images/bus1.jpg')} /> */}
        <FlatList
          style={styles.paddingFlatList}
          data={DATA}
          keyExtractor={item => item.id}
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
              title={`Booking ID : ${item.title}`}
              subtitle={`Destination : ${item.title2}`}
              onPress={() => {
                navigation.navigate('TripDetail');
              }}
            />
          )}
        />
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
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
