import React from "react";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser
} from "react-icons/fa";
import PropTypes from "prop-types";

import { battle } from "../utils/api";
import Card from "./card";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.protoTypes = {
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    battle([playerOne, playerTwo])
      .then(players =>
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        })
      )
      .catch(e =>
        //   console.log(12, e, 14, e.message) ||
        this.setState({ error: e.message, loading: false })
      );
  }

  render() {
    const { winner, loser, loading, error } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            avatar={winner.profile.avatar_url}
            login={winner.profile.login}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            href={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            avatar={loser.profile.avatar_url}
            login={loser.profile.login}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            href={loser.profile.html_url}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <button className="btn dark-btn btn-space" onClick={this.props.onReset}>
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default Results;
