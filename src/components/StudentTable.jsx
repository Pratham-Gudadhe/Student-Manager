import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  useTheme
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StudentTable({ students, onEdit, onDelete }) {
  const theme = useTheme();

  const HEADERS = ["Roll", "Name", "Department", "Year", "CGPA", "Actions"];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Student List
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 400,
          borderRadius: 2,
          overflow: "auto",
          backgroundColor : "#f5f5f5",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {HEADERS.map((title) => (
                <TableCell
                  key={title}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#9e9e9e",
                    color: theme.palette.primary.contrastText
                  }}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={HEADERS.length} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <TableRow
                  key={student.roll}
                  sx={{
                    backgroundColor:
                      index % 2
                        ? theme.palette.background.default
                        : theme.palette.action.hover,
                    "&:hover": { backgroundColor: theme.palette.action.selected }
                  }}
                >
                  <TableCell>{student.roll}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.dept}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>{student.cgpa}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => onEdit(student)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => onDelete(student.roll)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}