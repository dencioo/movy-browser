import MOVY_API_BASE_URL from './apiConfig.js';

const getAuthenticationHeader = () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return {'Authorization': `Bearer ${token}`};
  }

  return {};
}

export async function createWatchlist(name) {
  const res = await fetch(`${MOVY_API_BASE_URL}/watchlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthenticationHeader()
    },
    body: JSON.stringify({ name })
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create watchlist');
  }
}

export async function getUserWatchlist() {
  const res = await fetch(`${MOVY_API_BASE_URL}/watchlists`, {
    headers: getAuthenticationHeader()
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to create watchlist');
  }

  return data;
}

export async function getWatchlistById(id) {
  const res = await fetch(`${MOVY_API_BASE_URL}/watchlists/${id}`, {
    headers: getAuthenticationHeader()
    }
  )

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch watchlist');
  }

  return data;
}

export async function renameWatchlist(id, newName) {
  const res = await fetch(`${MOVY_API_BASE_URL}/watchlists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthenticationHeader()
    },
    body: JSON.stringify({ name: newName })
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to rename wathclist');
  }

  return data;
}

export async function deleteWatchlist(id) {
  const res = await fetch(`${MOVY_API_BASE_URL}/watchlists/${id}`, {
    method: 'DELETE',
    headers: getAuthenticationHeader()
  })
  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to delete watchlist');
  }

  return data;
}

export async function addMovieToWatchlist(watchlistId, movieId) {
  const res = await fetch(`${MOVY_API_BASE_URL}/watchlists/${watchlistId}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthenticationHeader()
    },
    body: JSON.stringify({ movieId })
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Failed to add movie to watchlist');
  }

  return data;
}