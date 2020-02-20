import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { color } from '../../../Public/components/Layout';
import { requestStation } from '../../../Public/redux/action/station';
import {
  addDeparture,
  addArrival
} from '../../../Public/redux/action/schedule';
import { networkcheck } from '../../../Public/helper/networkcheck';
import { Toast } from '../../../Public/components/Toast';

class SearchStation extends Component {
  state = {
    search: '',
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.textParams === 'Departure') {
      return {
        headerRight: () => {
          return (
            <Text
              style={styles.headerRightText}
              onPress={() => navigation.state.params.handleResetDeparture()}>
              Reset
            </Text>
          );
        }
      };
    } else {
      return {
        headerRight: () => {
          return (
            <Text
              style={styles.headerRightText}
              onPress={() => navigation.state.params.handleResetArrival()}>
              Reset
            </Text>
          );
        }
      };
    }
  };

  componentDidMount = async () => {
    const {
      navigation,
      reqStation,
      resetArrivalData,
      resetDepartureData
    } = this.props;
    await reqStation();
    navigation.setParams({
      handleResetArrival: () => {
        resetArrivalData();
        navigation.navigate('Home');
      },
      handleResetDeparture: () => {
        resetDepartureData();
        navigation.navigate('Home');
      }
    });
  };

  handleChoose = item => {
    const { addDepartureData, addArrivalData } = this.props;
    if (this.props.navigation.state.params.textParams === 'Departure') {
      addDepartureData(item);
      this.props.navigation.navigate('Home');
    } else {
      addArrivalData(item);
      this.props.navigation.navigate('Home');
    }
  };

  updateSearch = text => {
    const { reqStation } = this.props;
    this.setState(
      {
        search: text
      },
      () => {
        reqStation(text);
      }
    );
  };

  _onRefresh = async () => {
    this.setState({
      refreshing: true
    });
    const { reqStation } = this.props;

    try {
      await reqStation().then(() => {
        this.setState({
          refreshing: false
        });
      });
    } catch ({ response }) {
      networkcheck();
      if (response && response.data.error) {
        Toast(response.data.error);
      }
    }
  };

  render() {
    const { station } = this.props;
    const { search, refreshing } = this.state;
    return station.isLoading ? (
      <View style={styles.padding10}>
        <View style={styles.padding10}>
          <ActivityIndicator size="large" color={color.Primary} />
        </View>
      </View>
    ) : (
      <Fragment>
        <SearchBar
          placeholder="Search City or Station..."
          containerStyle={styles.whiteColor}
          lightTheme
          inputContainerStyle={styles.whiteColor}
          onChangeText={text => {
            this.updateSearch(text);
          }}
          value={search}
        />

        {station.data ? (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            style={styles.flatStyle}
            data={station.data}
            keyExtractor={item => item.station_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.handleChoose(item);
                }}>
                <View>
                  <Text style={styles.cityName}>{item.city_name}</Text>
                  <Text>{item.station_name}</Text>
                  <View style={styles.border} />
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          ''
        )}
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
  flatStyle: {
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 16
  },
  headerRightText: {
    color: color.TextSecondary,
    fontSize: 16,
    marginHorizontal: 16
  },
  padding10: {
    padding: 10
  }
};

const mapStateToProps = state => {
  return {
    station: state.station
  };
};

const mapDispatchToProps = dispatch => ({
  reqStation: payload => dispatch(requestStation(payload)),
  addDepartureData: payload => dispatch(addDeparture(payload)),
  addArrivalData: payload => dispatch(addArrival(payload)),
  resetArrivalData: () => dispatch({ type: 'RESET_ARRIVAL' }),
  resetDepartureData: () => dispatch({ type: 'RESET_DEPARTURE' })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStation);
