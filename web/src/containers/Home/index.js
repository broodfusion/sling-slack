import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRoom, fetchRooms, joinRoom } from '../../actions/rooms';
import Navbar from '../../components/Navbar';
import NewRoomForm from '../../components/NewRoomForm';
import RoomListItem from '../../components/RoomListItem';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto'
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  handleNewRoomSubmit = data => this.props.createRoom(data);

  handleRoomJoin = roomId => this.props.joinRoom(roomId);

  renderRooms() {
    const currentUserRoomIds = [];
    this.props.currentUserRooms.map(room => currentUserRoomIds.push(room.id));

    return this.props.rooms.map(room => (
      <RoomListItem
        key={room.id}
        room={room}
        onRoomJoin={this.handleRoomJoin}
        currentUserRoomIds={currentUserRoomIds}
      />
    ));
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Create a new room
          </h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} />
        </div>
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Join a room
          </h3>
          {this.renderRooms()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ rooms }) {
  return {
    rooms: rooms.all,
    currentUserRooms: rooms.currentUserRooms
  };
}

export default connect(
  mapStateToProps,
  { fetchRooms, createRoom, joinRoom }
)(Home);
