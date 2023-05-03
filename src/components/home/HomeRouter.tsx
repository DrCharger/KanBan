import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Board from "../Board";
import { HomeProps } from "../../types/prop.types";
import * as actions from "src/usersStore/users.actions";
import * as selectors from "src/usersStore/users.selectors";
import { Main } from "./HomeRoter.styled";

const KanbanHome: React.FC<HomeProps> = ({
  setUrlInfo,
  getUsersList,
  setCorrectColumns,
  setRequestName,
  setBadRequest,
  filtered,
  reqName,
  urlInfo,
  error,
}) => {
  return (
    <Main>
      <Header
        setUrlInfo={setUrlInfo}
        getUsersList={getUsersList}
        urlInfo={urlInfo}
        setCorrectColumns={setCorrectColumns}
        setRequestName={setRequestName}
        setBadRequest={setBadRequest}
        reqName={reqName}
        error={error}
      />
      <Board items={filtered} reqName={reqName} />
    </Main>
  );
};

const mapState = (state: any) => {
  return {
    urlInfo: selectors.urlInfoSelector(state),
    filtered: selectors.filteredSelector(state),
    reqName: selectors.reqNameSelector(state),
    error: selectors.errorSelector(state),
  };
};

const mapDispatch = {
  getUsersList: actions.getUsersList,
  setUrlInfo: actions.setUrlInfo,
  setCorrectColumns: actions.setCorrectColumns,
  setRequestName: actions.setRequestName,
  setBadRequest: actions.setBadRequest,
};

export default connect(mapState, mapDispatch)(KanbanHome);
