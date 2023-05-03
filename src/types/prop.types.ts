import { BaseInfo, Columns } from "./users.types";

export type HomeProps = {
  urlInfo: BaseInfo;
  filtered: Columns;
  reqName: string;
  error: string;
  getUsersList: (vName: string, vNum: number) => void;
  setUrlInfo: (v: BaseInfo) => void;
  setCorrectColumns: (v: Columns) => void;
  setRequestName: (v: string) => void;
  setBadRequest: (v: string) => void;
};

export type HeaderTypes = {
  urlInfo: BaseInfo;
  reqName: string;
  error: string;
  getUsersList: (vName: string, vNum: number) => void;
  setUrlInfo: (v: BaseInfo) => void;
  setCorrectColumns: (v: Columns) => void;
  setRequestName: (v: string) => void;
  setBadRequest: (v: string) => void;
};

export type BoardProps = {
  items: Columns;
  reqName: string;
};
