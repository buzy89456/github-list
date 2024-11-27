import { useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { getToken } from '../api';

const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${
  import.meta.env.VITE_CLIENT_ID
}&redirect_uri=${import.meta.env.VITE_CALLBACK_URL}&scope=repo`;

const handleLogin = () => {
  window.location.assign(githubAuthUrl);
};

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasFetched = useRef<boolean>(false);
  const urlParams = new URLSearchParams(location.search);
  const code = urlParams.get('code');

  const { mutate, isPending } = useMutation({
    mutationFn: getToken,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/', { replace: true });
    },
  });

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;

    if (code && !localStorage.getItem('token')) {
      mutate(code);
    }
  }, [code, mutate]);

  if (localStorage.getItem('token')) {
    return <Navigate to={'/'} replace />;
  }

  if (isPending) {
    return (
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack bgcolor={'white'} height={'40dvh'} p={5} justifyContent={'center'}>
        <Typography variant="h4" textAlign={'center'}>
          Welcome to Github Issue!
        </Typography>
        <Box display={'flex'} justifyContent={'center'} mt={5}>
          <Button variant="contained" onClick={handleLogin}>
            Login With Github
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};
