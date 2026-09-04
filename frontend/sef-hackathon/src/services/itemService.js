const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE}/api/items${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    })
  } catch {
    const error = new Error('The server is unavailable. Check your connection and try again.')
    error.kind = 'network'
    throw error
  }

  if (!response.ok) {
    let details
    try { details = await response.json() } catch { /* response has no JSON body */ }
    const error = new Error(
      response.status === 404
        ? 'That report could not be found.'
        : response.status === 400
          ? 'Some report details are invalid. Please review them and try again.'
          : 'We could not complete your request. Please try again.',
    )
    error.status = response.status
    error.details = details
    throw error
  }

  return response.status === 204 ? null : response.json()
}

export function getItems(filters = {}) {
  const params = new URLSearchParams(
    Object.entries(filters).filter(([, value]) => value !== '' && value != null),
  )
  return request(params.size ? `?${params}` : '')
}

export function getItem(id) {
  return request(`/${id}`)
}

export function createItem(values) {
  return request('', { method: 'POST', body: JSON.stringify(values) })
}

export function updateItem(id, values) {
  return request(`/${id}`, { method: 'PUT', body: JSON.stringify(values) })
}

export function resolveItem(id) {
  return request(`/${id}/resolve`, { method: 'PATCH' })
}

export function deleteItem(id) {
  return request(`/${id}`, { method: 'DELETE' })
}
