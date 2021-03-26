import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const GroupSelect = ({ selectedOption, options, handleSelectionChange }) => {
  return (
    <div>
      <InputLabel id="group-by-options">Group by: </InputLabel>
      <Select
        labelId="group-by-options"
        value={selectedOption}
        onChange={handleSelectionChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default GroupSelect;
