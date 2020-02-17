import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import styled from 'styled-components';
import { SearchBar } from 'react-native-elements';
import { requestStation } from '../../../Public/redux/action/station';
import {
  addDeparture,
  addArrival
} from '../../../Public/redux/action/schedule';

const MainContainer = styled(ScrollView)`
  background-color: #ffffff;
  height: 100%;
  padding: 16px;
`;

class SearchStation extends Component {
  state = {
    search: ''
  };
  componentDidMount = async () => {
    const { reqStation } = this.props;
    await reqStation();
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
  render() {
    const { station } = this.props;
    const { search } = this.state;
    return (
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
        <MainContainer>
          {station.data ? (
            <FlatList
              data={station.data}
              keyExtractor={item => item.station_id}
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
        </MainContainer>
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
  whiteColor: { backgroundColor: '#ffffff' }
};

const mapStateToProps = state => {
  return {
    station: state.station
  };
};

const mapDispatchToProps = dispatch => ({
  reqStation: payload => dispatch(requestStation(payload)),
  addDepartureData: payload => dispatch(addDeparture(payload)),
  addArrivalData: payload => dispatch(addArrival(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchStation);
