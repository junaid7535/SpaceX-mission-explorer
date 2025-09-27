const BASE_URL = 'https://api.spacexdata.com/v4';

async function doFetch(url) {
  const res = await fetch(url);

  if (!res.ok) {
    
    throw new Error(`API request failed with status ${res.status}`);
  }
  
  return res.json();
}


export const getLaunches = async () => {
  return doFetch(`${BASE_URL}/launches`);
};


export const getLaunch = async (id) => {
  if (!id) {
    
    throw new Error('Launch ID is required');
  }

  return doFetch(`${BASE_URL}/launches/${id}`);
};
