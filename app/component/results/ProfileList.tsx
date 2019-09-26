import * as React from "react";
import styled from "styled-components";
import {
  FaUser,
  FaUsers,
  FaUserFriends,
  FaBriefcase,
  FaCompass
} from "react-icons/fa";
import Tooltip from "../tooltip";

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

const StyledCardList = styled.ul`
  margin: 20px 0;
  font-size: 20px;
  li {
    display: flex;
    align-items: center;
    margin: 10px;
  }
  svg {
    margin-right: 10px;
  }
  a {
    font-weight: 500;
    color: inherit;
  }
`;

const StyledFaUser = styled(FaUser)`
  color: rgb(239, 115, 115);
`;
const StyledFaCompass = styled(FaCompass)`
  color: rgb(144, 115, 255);
`;
const StyledFaBriefcase = styled(FaBriefcase)`
  color: #795548;
`;
const StyledFaUsers = styled(FaUsers)`
  color: rgb(129, 195, 245);
`;
const StyledFaUserFriends = styled(FaUserFriends)`
  color: rgb(64, 183, 95);
`;

export const ProfileList = ({ profile }: IProfileListProps) => (
  <StyledCardList>
    <Tooltip text="User's name">
      <li>
        <StyledFaUser size={22} />
        {profile.name}
      </li>
    </Tooltip>
    {profile.location && (
      <Tooltip text="User's location">
        <li>
          <StyledFaCompass size={22} />
          {profile.location}
        </li>
      </Tooltip>
    )}
    {profile.company && (
      <li>
        <StyledFaBriefcase size={22} />
        {profile.company}
      </li>
    )}
    <li>
      <StyledFaUsers size={22} />
      {profile.followers.toLocaleString()} followers
    </li>
    <li>
      <StyledFaUserFriends size={22} />
      {profile.following.toLocaleString()} following
    </li>
  </StyledCardList>
);
