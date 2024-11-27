import { z } from 'zod';

export type GetTokenRes = {
  token: string;
};

export enum StateEnum {
  open = 'open',
  closed = 'closed',
}

const repoSchema = z.object({
  name: z.string(),
});
const issueSchema = z.object({
  id: z.number(),
  repository: repoSchema,
  title: z.string(),
  created_at: z.string(),
  body: z.string(),
  state: z.string(),
});
export const issuesSchema = z.array(issueSchema);
export type IssueSchema = z.infer<typeof issueSchema>;
export type IssuesSchema = z.infer<typeof issuesSchema>;
