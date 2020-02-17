import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import ModalFilterBus from '../../Public/components/ModalFilterBus';

const DATA = new Array(10).fill({
  id: '1',
  title: '12121',
  title2: 'Bogor, Branang-Siang'
});

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
    return (
      <Fragment>
        <FlatList
          style={styles.paddingFlatList}
          data={DATA}
          keyExtractor={item => item.id}
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
              title={
                <Fragment>
                  <Text>Bus Name :</Text>
                  <Text>Departure : </Text>
                  <Text>Arival : </Text>
                  <Text style={styles.fontBold}>Price : </Text>
                </Fragment>
              }
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
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule);
