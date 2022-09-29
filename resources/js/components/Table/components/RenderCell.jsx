import * as React from "react";

export const RenderCell = ({row, cell}) => {
    const {field, component} = cell;
    if (component) {
        return React.cloneElement(component, {row, cell});
    }
    return row?.[field] || '';
}
