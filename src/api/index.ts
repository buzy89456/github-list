import axios from 'axios';
import { GetTokenRes, IssuesSchema, issuesSchema } from '../types';

export const getToken = async (code: string): Promise<GetTokenRes> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/exchange-token`,
    { params: { code } }
  );
  return data;
};

export const getIssues = async (): Promise<IssuesSchema> => {
  const { data } = await axios.get('https://api.github.com/issues', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: { filter: 'all' },
  });
  return issuesSchema.parse(data);
};
