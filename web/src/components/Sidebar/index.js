// @flow
import { css, StyleSheet } from 'aphrodite';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchUserRooms } from '../../actions/rooms';
import { signout } from '../../actions/session';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(38,28,37)'
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none'
    },
    ':focus': {
      textDecoration: 'none'
    }
  },

  activeLink: {
    color: '#fff',
    ':after': {
      position: 'absolute',
      top: '12px',
      bottom: '12px',
      left: '0',
      width: '3px',
      background: 'rgba(255,255,255,.2)',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
      content: '""'
    }
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px'
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer'
  }
});

const RoomLink = ({ room }) => (
  <NavLink
    to={`/r/${room.id}`}
    className={css(styles.link)}
    activeClassName={css(styles.activeLink)}
  >
    <div className={css(styles.badge)}>
      <span>{room.name.charAt(0)}</span>
    </div>
  </NavLink>
);
class Sidebar extends Component {
  componentDidMount() {
    this.props.fetchUserRooms(localStorage.getItem('userID'));
  }
  render() {
    const { rooms } = this.props;
    return (
      <div className={css(styles.sidebar)}>
        {rooms.map(room => <RoomLink key={room.id} room={room} />)}
        <NavLink
          to="/"
          exact
          className={css(styles.link)}
          activeClassName={css(styles.activeLink)}
        >
          <div className={css(styles.badge)}>
            <span className="fa fa-plus" />
          </div>
        </NavLink>
        <div style={{ flex: '1' }} />
        <NavLink
          to="/signout"
          className={css(styles.link, styles.logoutButton)}
        >
          <div className={css(styles.badge)}>
            <span className="fa fa-sign-out" />
          </div>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = ({ rooms }) => {
  return {
    rooms: rooms.currentUserRooms
  };
};

export default connect(
  mapStateToProps,
  { signout, fetchUserRooms }
)(Sidebar);
