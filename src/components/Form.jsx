import { useState, useEffect } from "react";
import { FormControl, TextField, Typography, Button, MenuItem } from "@mui/material";

export default function Form({ editingStudent, onSave, onClear, students }) {
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    dept: "",
    year: "",
    cgpa: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const resetForm = () => {
    setFormData({ roll: "", name: "", dept: "", year: "", cgpa: "" });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    const { roll, name, dept, year, cgpa } = formData;

    if (!roll) {
      newErrors.roll = "Roll number is required";
    } else {
      const duplicate = students.find(
        (student) =>
          student.roll === roll &&
          (!editingStudent || student.roll !== editingStudent.roll)
      );
      if (duplicate) newErrors.roll = "Roll number must be unique";
    }

    if (!name.trim()) newErrors.name = "Name is required";
    if (!dept) newErrors.dept = "Department is required";
    if (!year) newErrors.year = "Year is required";

    if (cgpa === "") {
      newErrors.cgpa = "CGPA is required";
    } else if (cgpa < 0 || cgpa > 10) {
      newErrors.cgpa = "CGPA must be between 0 and 10";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputData = (event) => {
    setFormData((currData) => ({
      ...currData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    onSave({ ...formData, cgpa: parseFloat(formData.cgpa) });
    resetForm();
  };

  const handleClear = () => {
    resetForm();
    onClear();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Typography variant="h6" gutterBottom>
          {editingStudent ? "Edit Student" : "Add Student"}
        </Typography>

        <TextField
          label="Roll Number"
          name="roll"
          value={formData.roll}
          onChange={handleInputData}
          error={!!errors.roll}
          helperText={errors.roll}
          required
          size="medium"
          margin="normal"
        />

        <TextField
          label="Student's Name"
          name="name"
          value={formData.name}
          onChange={handleInputData}
          error={!!errors.name}
          helperText={errors.name}
          size="medium"
          required
          margin="normal"
        />

        <TextField
          select
          label="Department"
          name="dept"
          value={formData.dept}
          onChange={handleInputData}
          error={!!errors.dept}
          helperText={errors.dept}
          required
          size="medium"
          margin="normal"
        >
          <MenuItem value="">--Branch--</MenuItem>
          <MenuItem value="CSE">CSE</MenuItem>
          <MenuItem value="ECE">ECE</MenuItem>
          <MenuItem value="ME">ME</MenuItem>
          <MenuItem value="CE">CE</MenuItem>
          <MenuItem value="EE">EE</MenuItem>
        </TextField>

        <TextField
          select
          label="Year"
          name="year"
          value={formData.year}
          onChange={handleInputData}
          error={!!errors.year}
          helperText={errors.year}
          required
          size="medium"
          margin="normal"
        >
          <MenuItem value="">--Year--</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
        </TextField>

        <TextField
          type="number"
          label="CGPA"
          name="cgpa"
          inputProps={{ min: 0, max: 10, step: 0.01 }}
          value={formData.cgpa}
          onChange={handleInputData}
          error={!!errors.cgpa}
          helperText={errors.cgpa}
          required
          size="medium"
          margin="normal"
        />

        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ height: 40 }}
          >
            {editingStudent ? "Update" : "Save"}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="error"
            sx={{ height: 40 }}
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </FormControl>
    </form>
  );
}
