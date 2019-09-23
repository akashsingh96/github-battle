import * as React from "react";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser
} from "react-icons/fa";
import { RouteProps } from "react-router";
import * as queryString from "query-string";
import { Link } from "react-router-dom";

import { battle } from "../utils/api";
import Card from "./card";
import Loader from "./loader";
import Tooltip from "./tooltip";

export interface IProfileList {
  name: string;
  location?: string;
  company: string;
  followers: number;
  following: number;
  avatar_url: string;
  login: string;
  html_url: string;
}
interface IProfileListProps {
  profile: IProfileList;
}

function ProfileList({ profile }: IProfileListProps) {
  return (
    <ul className="card-list">
      <Tooltip text="User's name">
        <li>
          <FaUser color="rgb(239, 115, 115)" size={22} />
          {profile.name}
        </li>
      </Tooltip>
      {profile.location && (
        <Tooltip text="User's location">
          <li>
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </li>
        </Tooltip>
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

interface IResultsState {
  winner?: { score: number; profile: IProfileList };
  loser?: { score: number; profile: IProfileList };
  error: string | null;
  loading: boolean;
}

class Results extends React.Component<RouteProps, IResultsState> {
  state: IResultsState = {
    error: null,
    loading: true
  };

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location!.search
    );

    battle([playerOne, playerTwo] as string[])
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
      return <Loader text="fetching data" />;
    }
    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <>
        <div className="grid space-around container-sm">
          <Card
            header={winner!.score === loser!.score ? "Tie" : "Winner"}
            avatar={winner!.profile.avatar_url}
            login={winner!.profile.login}
            subheader={`Score: ${winner!.score.toLocaleString()}`}
            href={winner!.profile.html_url}
          >
            <ProfileList profile={winner!.profile} />
          </Card>
          <Card
            header={winner!.score === loser!.score ? "Tie" : "Loser"}
            avatar={loser!.profile.avatar_url}
            login={loser!.profile.login}
            subheader={`Score: ${loser!.score.toLocaleString()}`}
            href={loser!.profile.html_url}
          >
            <ProfileList profile={loser!.profile} />
          </Card>
        </div>
        <Link className="btn dark-btn btn-space" to="/battle">
          Reset
        </Link>
      </>
    );
  }
}

export default Results;
