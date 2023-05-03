import { ContainerProp, FlexProp, IssueProp } from "../../types/style.types";
import styled from "styled-components";

export const Main = styled("div")`
  padding: 2% 5% 0;
  max-width: 100%;
  box-sizing: border-box;
  background-color: #263b4a;
  color: #fff;
`;

export const Flex = styled("div")<FlexProp>`
  display: flex;
  flex-direction: ${(props) => props.row || "row"};
  margin: ${(props) => props.margin || "0"};
  position: ${(props) => props.pos || "static"};
  justify-content: ${(props) => props.justify || ""};
  align-items: ${(props) => props.align || ""};
  flex: 1;
`;

export const Container = styled("div")<ContainerProp>`
  padding: 30px;
  width: 350px;
  min-height: 700px;
  border-radius: 20px;
  box-shadow: inset 0px 0px 26px 0px rgba(0, 0, 0, 0.25);
  background-color: ${(props) =>
    props.back ? "lightblue" : "lightgrey" || ""};
`;

export const Issue = styled("div")<IssueProp>`
  user-select: none;
  padding: 16px;
  margin: 0 0 15px 0;
  min-height: 50px;
  background-color: ${(props) => (props.back ? "#263B4A" : "#456C86" || "")};
  border-radius: 20px;
  color: #456c86;
  ${(props) => props.draggableStyle};
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.5);
`;

export const CardWrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const Title = styled.span<{ isOpen: boolean }>`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
  white-space: ${(props) => (props.isOpen ? "wrap" : "nowrap")};
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 5s ease;
`;

export const IssueNumber = styled.div`
  font-size: 14px;
  margin-top: 20px;
`;

export const Subtext = styled.div`
  font-size: 14px;
`;

export const LinkText = styled.a`
  color: #fff;
  font-size: 20px;
  text-decoration: none;
  display: inline-block;
  margin: 0 10px;
  :hover {
    color: orange;
    text-decoration: underline;
  }
`;
