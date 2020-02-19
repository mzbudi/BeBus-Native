import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import ModalFilterBus from '../../Public/components/ModalFilterBus';
import ListBus from '../../Public/components/ListBus';
import {
  findBusTicket,
  getBusDetail
} from '../../Public/redux/action/schedule';
import { networkcheck } from '../../Public/helper/networkcheck';
import { Toast } from '../../Public/components/Toast';
import { color } from '../../Public/components/Layout';

class Schedule extends Component {
  state = {
    refreshing: false,
    visibleFilter: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.state.params.handleFilterBus();
            }}>
            <View style={styles.iconFilter}>
              <Icon
                name="filter-list"
                size={35}
                type="material"
                color={color.TextSecondary}
              />
            </View>
          </TouchableOpacity>
        );
      }
    };
  };

  _onRefresh = async () => {
    this.setState({
      refreshing: true
    });
    const { handleFindBusTicket, schedule } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '',
      maxDepartureTime: '',
      minArrivalTime: '',
      maxArrivalTime: '',
      minPrice: '',
      maxPrice: ''
    };
    try {
      await handleFindBusTicket(body).then(() => {
        this.setState({
          refreshing: false
        });
      });
    } catch ({ response }) {
      networkcheck();
      if (response && response.data.error) {
        Toast(response.data.error);
      }
      this.setState({
        refreshing: false
      });
    }
  };

  handleShowAllBus = () => {
    const { schedule, handleFindBusTicket } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '',
      maxDepartureTime: '',
      minArrivalTime: '',
      maxArrivalTime: '',
      minPrice: '',
      maxPrice: ''
    };
    handleFindBusTicket(body);
    this.setState({
      visibleFilter: false
    });
  };

  handleUnder300K = () => {
    const { schedule, handleFindBusTicket } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '',
      maxDepartureTime: '',
      minArrivalTime: schedule.minArrivalTime || '',
      maxArrivalTime: schedule.maxArrivalTime || '',
      minPrice: '',
      maxPrice: '300000'
    };
    handleFindBusTicket(body);
    this.setState({
      visibleFilter: false
    });
  };

  handleOver300K = () => {
    const { schedule, handleFindBusTicket } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '',
      maxDepartureTime: '',
      minArrivalTime: schedule.minArrivalTime || '',
      maxArrivalTime: schedule.maxArrivalTime || '',
      minPrice: '300000',
      maxPrice: ''
    };
    handleFindBusTicket(body);
    this.setState({
      visibleFilter: false
    });
  };

  handleDepartureTimeZone1 = () => {
    const { schedule, handleFindBusTicket } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '06:00',
      maxDepartureTime: '12:00',
      minArrivalTime: schedule.minArrivalTime || '',
      maxArrivalTime: schedule.maxArrivalTime || '',
      minPrice: schedule.minPrice || '',
      maxPrice: schedule.maxPrice || ''
    };
    handleFindBusTicket(body);
    this.setState({
      visibleFilter: false
    });
  };

  handleDepartureTimeZone1 = () => {
    const { schedule, handleFindBusTicket } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '06:00',
      maxDepartureTime: '12:00',
      minArrivalTime: schedule.minArrivalTime || '',
      maxArrivalTime: schedule.maxArrivalTime || '',
      minPrice: schedule.minPrice || '',
      maxPrice: schedule.maxPrice || ''
    };
    handleFindBusTicket(body);
    this.setState({
      visibleFilter: false
    });
  };

  handleDepartureTimeZone2 = () => {
    const { schedule, handleFindBusTicket } = this.props;
    const body = {
      date: schedule.date || '',
      departureCity: schedule.departureCity || '',
      arrivalCity: schedule.arrivalCity || '',
      minAvailableSeats: schedule.minAvailableSeats || '',
      minDepartureTime: '12:01',
      maxDepartureTime: '21:00',
      minArrivalTime: schedule.minArrivalTime || '',
      maxArrivalTime: schedule.maxArrivalTime || '',
      minPrice: schedule.minPrice || '',
      maxPrice: schedule.maxPrice || ''
    };
    handleFindBusTicket(body);
    this.setState({
      visibleFilter: false
    });
  };

  handleFilterBus = () => {
    this.setState({
      visibleFilter: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      visibleFilter: false
    });
  };

  handleGetBusDetail = id => {
    this.props.handleGetBusDetail({ id: id });
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleFilterBus: this.handleFilterBus
    });
  }

  render() {
    const { visibleFilter, refreshing } = this.state;
    const { schedule } = this.props;
    return (
      <Fragment>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          style={styles.paddingFlatList}
          data={schedule.searchResult}
          keyExtractor={item => item.schedule_id.toString()}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                this.handleGetBusDetail(item.schedule_id);
                this.props.navigation.navigate('ScheduleDetail');
              }}
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
              title={<ListBus scheduleData={item} />}
            />
          )}
        />
        <ModalFilterBus
          visibleFilter={visibleFilter}
          functionVisible={this.handleCloseModal.bind(this)}
          timeZone1={this.handleDepartureTimeZone1.bind(this)}
          timeZone2={this.handleDepartureTimeZone2.bind(this)}
          showAll={this.handleShowAllBus.bind(this)}
          under300K={this.handleUnder300K.bind(this)}
          over300K={this.handleOver300K.bind(this)}
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
    borderBottomWidth: 1,
    marginHorizontal: 0,
    marginVertical: 10
  },
  whiteColor: { backgroundColor: '#ffffff' },
  iconFilter: { right: 16 },
  fontBold: { fontWeight: 'bold' }
};

const mapStateToProps = state => {
  return {
    schedule: state.schedule
  };
};

const mapDispatchToProps = dispatch => ({
  handleFindBusTicket: payload => dispatch(findBusTicket(payload)),
  handleGetBusDetail: payload => dispatch(getBusDetail(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
