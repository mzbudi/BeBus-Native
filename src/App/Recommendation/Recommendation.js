import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

class Recommendation extends Component {
  render() {
    return (
      <View>
        <ListItem
          bottomDivider
          title={<Text style={styles.centered}>Stay Tune !</Text>}
          subtitle={
            <Text style={styles.centered}>We Will Be Comming Soon</Text>
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendation);

const styles = {
  centered: {
    alignSelf: 'center',
    fontWeight: 'bold'
  }
};
