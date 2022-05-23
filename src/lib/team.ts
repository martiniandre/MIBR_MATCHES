import axios from 'axios';

export async function getTeamMatches() {
  const { data } = await axios.get('http://localhost:3000/api');
  return data.rows;
}
