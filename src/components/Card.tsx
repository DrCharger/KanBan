import { Issue } from "../types/users.types";
import React, { useState } from "react";
import { dateToDays } from "src/utilits/utilits";
import {
  CardWrapper,
  IssueNumber,
  Subtext,
  Title,
} from "./home/HomeRoter.styled";

const Card: React.FC<{ item: Issue }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const stateText =
    item.state === "open"
      ? `opened ${dateToDays(item.created_at)}`
      : `closed ${dateToDays(item.closed_at)}`;

  return (
    <CardWrapper
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Title isOpen={open}>{item.title}</Title>
      <IssueNumber>
        #{item.number} {item.state}
      </IssueNumber>
      <Subtext>{stateText}</Subtext>
      <Subtext>
        {item.login} | Comments: {item.comments}
      </Subtext>
    </CardWrapper>
  );
};

export default Card;
