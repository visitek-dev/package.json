import {styled, withStyle} from "baseui";
import {
    StyledTable as BaseStyledTable,
    StyledHeadCell as BaseStyledHeadCell,
    StyledBodyCell as BaseStyledCell
} from "baseui/table-grid";

export const TableWrapper = styled("div", () => ({
    width: "100%",
    height: "450px"
}));

export const StyledTable = withStyle(BaseStyledTable, () => ({
    borderTopLeftRadius: "0 !important",
    borderTopRightRadius: "0 !important",
    borderBottomLeftRadius: "0 !important",
    borderBottomRightRadius: "0 !important",
    alignContent: "start"
}));
export const StyledHeadCell = withStyle(BaseStyledHeadCell, () => ({
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    color: "#161F6A !important",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderColor: "rgba(0, 0, 0, 0.12)",
    alignSelf: "start"
}));

export const StyledBodyCell = withStyle(BaseStyledCell, () => ({
    fontFamily: "'Lato', sans-serif",
    fontWeight: 400,
    color: "#161F6A !important",
    alignSelf: "center"
}));
