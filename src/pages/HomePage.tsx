import { useQuery } from '@tanstack/react-query';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
} from '@mui/material';
import { getIssues } from '../api';
import { StateEnum } from '../types';

const drawerWidth = 258;
const issueOptions = ['All Issues', 'Open', 'In Progress', 'Done'];

export const HomePage = () => {
  const theme = useTheme();
  const { data } = useQuery({ queryKey: ['issues'], queryFn: getIssues });

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: '1px solid hsl(215, 15%, 89%)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Github Issues
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'rgb(35, 48, 68)',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {issueOptions.map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: '100dvh',
        }}
      >
        <Toolbar />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">repo</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.repository.name}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.created_at}</TableCell>
                    <TableCell align="right">{row.body}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={row.state}
                        sx={{
                          bgcolor:
                            row.state === StateEnum.open
                              ? theme.palette.success.light
                              : row.state === StateEnum.closed
                              ? theme.palette.warning.light
                              : 'default',
                          color: 'white',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
