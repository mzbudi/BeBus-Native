import React, { Component } from 'react';
import Modal, { ModalTitle, ModalContent } from 'react-native-modals';
import CalendarPicker from 'react-native-calendar-picker';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { ListItem, Icon } from 'react-native-elements';

class ModalFilterBus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateChoosen: null
    };
  }

  handleClose() {
    if (this.props.functionVisible) {
      this.props.functionVisible();
    }
  }

  handleTimeZone1() {
    if (this.props.timeZone1) {
      this.props.timeZone1();
    }
  }

  handleTimeZone2() {
    if (this.props.timeZone2) {
      this.props.timeZone2();
    }
  }

  showAll() {
    if (this.props.showAll) {
      this.props.showAll();
    }
  }

  under300K() {
    if (this.props.under300K) {
      this.props.under300K();
    }
  }

  over300K() {
    if (this.props.over300K) {
      this.props.over300K();
    }
  }

  onDateChange = (date, type) => {
    this.setState({
      dateChoosen: date
    });
  };

  choosenDate = () => {
    const { dateChoosen } = this.state;
    if (this.props.chooseDate) {
      this.props.chooseDate(dateChoosen);
    }
  };
  render() {
    const { visibleFilter } = this.props;
    return (
      <Modal
        visible={visibleFilter}
        width={400}
        onTouchOutside={() => {
          this.handleClose();
        }}
        modalTitle={<ModalTitle title="Filter Bus By..." />}>
        <ModalContent>
          <ListItem
            onPress={() => { this.showAll() }}
            bottomDivider
            chevron={{
              color: 'green',
              size: 40,
              padding: 0,
              marginVertical: -12
            }}
            leftIcon={
              <Icon name="import-export" type="material" color="green" />
            }
            title="Show All Bus"
            titleStyle={styles.textBold}
          />
          <ListItem
            onPress={() => { this.under300K() }}
            bottomDivider
            chevron={{
              color: 'green',
              size: 40,
              padding: 0,
              marginVertical: -12
            }}
            leftIcon={
              <Icon name="import-export" type="material" color="green" />
            }
            title="Under 300K !"
            titleStyle={styles.textBold}
          />
          <ListItem
            onPress={() => { this.over300K() }}
            bottomDivider
            chevron={{
              color: 'green',
              size: 40,
              padding: 0,
              marginVertical: -12
            }}
            leftIcon={
              <Icon name="import-export" type="material" color="green" />
            }
            title="Over 300K !"
            titleStyle={styles.textBold}
          />
          <ListItem
            onPress={() => { this.handleTimeZone1() }}
            bottomDivider
            chevron={{
              color: 'green',
              size: 40,
              padding: 0,
              marginVertical: -12
            }}
            leftIcon={
              <Icon name="import-export" type="material" color="green" />
            }
            title="Departure Time 08.00 AM - 12.00 PM"
            titleStyle={styles.textBold}
          />
          <ListItem
            onPress={() => { this.handleTimeZone2() }}
            bottomDivider
            chevron={{
              color: 'green',
              size: 40,
              padding: 0,
              marginVertical: -12
            }}
            leftIcon={
              <Icon name="import-export" type="material" color="green" />
            }
            title="Departure Time 12.00 PM - 19.00 PM"
            titleStyle={styles.textBold}
          />
        </ModalContent>
      </Modal>
    );
  }
}

const styles = {
  textBold: { fontWeight: 'bold' }
};

export default ModalFilterBus;
