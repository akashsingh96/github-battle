import * as React from "react";
import { RouteProps } from "react-router";
import * as queryString from "query-string";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { battle } from "../../utils/api";
import Card from "../card";
import Loader from "../loader";
import { ProfileList } from "./ProfileList";

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

interface IResultsState {
  winner?: { score: number; profile: IProfileList };
  loser?: { score: number; profile: IProfileList };
  error: string | null;
  loading: boolean;
}

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
`;

const StyledError = styled.p`
  text-align: center;
  color: #ff1616;
  font-size: 20px;
  margin: 50px 0;
`;

const StyledLink = styled(Link)`
  padding: 10px;
  text-decoration: uppercase;
  letter-spacing: 0.25em;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  max-width: 200px;
  margin: 40px auto;
  color: #e6e6e6;
  background: #141414;
`;

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
      .catch(e => this.setState({ error: e.message, loading: false }));
  }

  render() {
    const { winner, loser, loading, error } = this.state;
    if (loading) {
      return <Loader text="fetching data" />;
    }
    if (error) {
      return <StyledError>{error}</StyledError>;
    }
    return (
      <>
        <CardWrapper>
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
        </CardWrapper>
        <StyledLink to="/battle">Reset</StyledLink>
      </>
    );
  }
}

export default Results;
