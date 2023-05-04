import { HeaderTypes } from "../../types/prop.types";
import React, { useEffect, useState } from "react";
import { getDataFromLocalStore } from "src/usersStore/users.gateWays";
import { correctName, correctUrl } from "src/utilits/utilits";
import { Flex, LinkText } from "./HomeRoter.styled";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CustomModal from "../Modal";
import ErrorModale from "../ErrorModale";

const Header: React.FC<HeaderTypes> = ({
  setUrlInfo,
  getUsersList,
  setCorrectColumns,
  setRequestName,
  setBadRequest,
  urlInfo,
  reqName,
  error,
}) => {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(30);
  const [validated, setValidated] = useState(false);
  const [answer, setAnswer] = useState<boolean | "">("");
  const { owner, repo } = urlInfo;
  const findIssue = () => {
    if (!value) return setValidated(true);
    const { result, fullname } = correctUrl(value);
    if (!fullname) return setValidated(true);
    setValidated(false);
    setUrlInfo(result);
    setRequestName(fullname);
    if (getDataFromLocalStore(fullname)) {
      setShow(true);
    } else {
      getUsersList(fullname, quantity);
    }
  };

  useEffect(() => {
    if (answer === "") return;
    if (answer) {
      setCorrectColumns(getDataFromLocalStore(reqName));
    } else {
      getUsersList(reqName, quantity);
    }
  }, [answer, getUsersList, quantity, reqName, setCorrectColumns]);

  const handleClose = () => {
    setBadRequest("");
    setUrlInfo({ owner: { name: "", url: "" }, repo: { name: "", url: "" } });
  };
  return (
    <>
      <Flex row="column">
        <Flex pos="relative">
          <InputGroup className="mb-3" hasValidation>
            <InputGroup.Text>https://github.com/</InputGroup.Text>
            <Form.Control
              value={value}
              type="url"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter repo URl"
              required
              isInvalid={validated}
            />
            <DropdownButton
              variant="secondary"
              title={quantity}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item onClick={() => setQuantity(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => setQuantity(30)}>30</Dropdown.Item>
              <Dropdown.Item onClick={() => setQuantity(50)}>50</Dropdown.Item>
              <Dropdown.Item onClick={() => setQuantity(100)}>
                100
              </Dropdown.Item>
            </DropdownButton>
            <Button onClick={findIssue}>Load Issues</Button>
            <Form.Control.Feedback type="invalid">
              <Alert variant="danger">
                Please type correct url{" "}
                <Alert.Link href="https://github.com/facebook/react">
                  'facebook/react'
                </Alert.Link>
              </Alert>
            </Form.Control.Feedback>
          </InputGroup>
        </Flex>
        {owner.name && error === "" && (
          <Flex align="center" margin="0 0 10px">
            <LinkText href={owner.url} target="_blank">
              {correctName(owner.name)}
            </LinkText>
            {">"}
            <LinkText href={repo.url} target="_blank">
              {correctName(repo.name)}
            </LinkText>
          </Flex>
        )}
      </Flex>
      <CustomModal
        show={show}
        reqName={reqName}
        handleClose={() => setShow(false)}
        setAnswer={setAnswer}
      />
      <ErrorModale error={error} handleClose={handleClose} />
    </>
  );
};

export default Header;
