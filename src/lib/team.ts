import axios from 'axios';

export async function getTeamMatches() {
  const PORT = process.env.PORT || 'http://localhost:3000';
  const { data } = await axios.get(`${PORT}/api`);
  return data.rows;
}
