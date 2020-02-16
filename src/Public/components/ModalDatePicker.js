import React, { Component } from 'react';
import Modal, { ModalTitle, ModalContent } from 'react-native-modals';
import CalendarPicker from 'react-native-calendar-picker';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

class ModalDatePicker extends React.Component {
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
    const { dateChoosen } = this.state;
    const dateOk = dateChoosen ? moment(dateChoosen).format('MMM Do YYYY') : '';
    return (
      <Modal
        visible={this.props.calendarVisible}
        onTouchOutside={() => {
          this.handleClose();
        }}
        modalTitle={<ModalTitle title="Choose Your Departure Date" />}>
        <ModalContent>
          <CalendarPicker onDateChange={this.onDateChange} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{dateOk}</Text>
            <TouchableOpacity
              onPress={() => {
                this.choosenDate();
              }}>
              <Text style={{ paddingRight: 16 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </Modal>
    );
  }
}

export default ModalDatePicker;
