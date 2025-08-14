import { useState } from "react";
import {
  TextField,
  MenuItem,
  Stack,
  Button,
  Tooltip,
  useTheme,
} from "@mui/material";

export default function SearchAndSort({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  onSort,
  onClearFilters,
}) {
  const theme = useTheme();

  const DEPARTMENTS = ["CSE", "ECE", "ME", "CE", "EE"];
  const YEARS = ["1", "2", "3", "4"];

  const [sortSettings, setSortSettings] = useState({
    field: "",
    direction: "asc",
  });

  const handleSortToggle = (field) => {
    const nextDirection =
      sortSettings.field === field && sortSettings.direction === "asc"
        ? "desc"
        : "asc";

    setSortSettings({ field, direction: nextDirection });
    onSort(field, nextDirection);
  };

  const resetAll = () => {
    setSortSettings({ field: "", direction: "asc" });
    onClearFilters();
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      alignItems="center"
      sx={{
        mb: 3,
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      component="form"
      onSubmit={(e) => e.preventDefault()}
    >
      <TextField
        label="Search by Roll or Name"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ width: 300 }} // Increased width
      />

      <TextField
        select
        label="Department"
        value={filters.dept}
        onChange={(e) => onFilterChange("dept", e.target.value)}
        size="small"
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All Departments</MenuItem>
        {DEPARTMENTS.map((dept) => (
          <MenuItem key={dept} value={dept}>
            {dept}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Year"
        value={filters.year}
        onChange={(e) => onFilterChange("year", e.target.value)}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All Years</MenuItem>
        {YEARS.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>

      <Tooltip title="Sort by CGPA">
        <Button variant="outlined" onClick={() => handleSortToggle("cgpa")}>
          CGPA{" "}
          {sortSettings.field === "cgpa"
            ? sortSettings.direction === "asc"
              ? "↑"
              : "↓"
            : ""}
        </Button>
      </Tooltip>

      <Tooltip title="Sort by Name">
        <Button variant="outlined" onClick={() => handleSortToggle("name")}>
          A-Z{" "}
          {sortSettings.field === "name"
            ? sortSettings.direction === "asc"
              ? "↑"
              : "↓"
            : ""}
        </Button>
      </Tooltip>

      <Tooltip title="Clear all filters and sorting">
        <Button variant="contained" color="error" onClick={resetAll}>
          Clear
        </Button>
      </Tooltip>
    </Stack>
  );
}
