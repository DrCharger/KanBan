import { BaseInfo } from "../../types/users.types";
import React, { useState } from "react";

import { correctName, correctUrl } from "src/utilits/utilits";

type HeaderTypes = {
  urlInfo: BaseInfo;
  getUsersList: (userName: string) => void;
  setUrlInfo: (data: BaseInfo) => void;
};

const Header: React.FC<HeaderTypes> = ({
  setUrlInfo,
  getUsersList,
  urlInfo,
}) => {
  const [value, setValue] = useState("");

  const { owner, repo } = urlInfo;

  const findIssue = async () => {
    const { result, split } = correctUrl(value);
    setUrlInfo(result);
    getUsersList(split);
  };
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter repo URl"
      />
      <button onClick={findIssue}>Load Issues</button>
      {owner.name && (
        <div>
          <a href={owner.url} target="_blank" rel="noreferrer">
            {correctName(owner.name)}
          </a>{" "}
          {">"}{" "}
          <a href={repo.url} target="_blank" rel="noreferrer">
            {correctName(repo.name)}
          </a>
        </div>
      )}
    </>
  );
};

export default Header;
