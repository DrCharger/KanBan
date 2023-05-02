import { BaseInfo, Columns } from "../../types/users.types";
import React from "react";
import { connect } from "react-redux";
import { getUsersList, setUrlInfo } from "src/usersStore/users.actions";
import Header from "./Header";
import DND from "../DND";

type HomeProps = {
  urlInfo: BaseInfo;
  filtered: Columns;
  getUsersList: (userName: string) => void;
  setUrlInfo: (data: BaseInfo) => void;
};

const HomeRouter: React.FC<HomeProps> = ({
  setUrlInfo,
  getUsersList,
  filtered,
  urlInfo,
}) => {
  return (
    <div>
      <Header
        setUrlInfo={setUrlInfo}
        getUsersList={getUsersList}
        urlInfo={urlInfo}
      />
      <DND items={filtered} />
    </div>
  );
};

const mapState = (state: any) => {
  return {
    urlInfo: state.usersList.urlInfo,
    filtered: state.usersList.filteredInfo,
  };
};

const mapDispatch = {
  getUsersList: getUsersList,
  setUrlInfo: setUrlInfo,
};

export default connect(mapState, mapDispatch)(HomeRouter);
