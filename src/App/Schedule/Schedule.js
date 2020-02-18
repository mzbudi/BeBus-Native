import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import ModalFilterBus from '../../Public/components/ModalFilterBus';
import ListBus from '../../Public/components/ListBus';

import { color } from '../../Public/components/Layout';

class Schedule extends Component {
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
                color="black"
              />
            </View>
          </TouchableOpacity>
        );
      }
    };
  };

  state = {
    visibleFilter: false
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

  componentDidMount() {
    this.props.navigation.setParams({
      handleFilterBus: this.handleFilterBus
    });
  }

  render() {
    const { visibleFilter } = this.state;
    const { schedule } = this.props;
    return (
      <Fragment>
        <FlatList
          style={styles.paddingFlatList}
          data={schedule.searchResult}
          keyExtractor={item => item.schedule_id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
