const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const STORAGE_KEY = 'campus-link-item-reports'

const sampleItems = [
  { id: 1, name: 'Black leather wallet', description: 'Small black wallet with a university ID and bank cards inside.', type: 'Lost', location: 'Main Library, Ground Floor', date: '2026-09-02', contactInfo: 'nimal@campus.lk', imageUrl: '', isResolved: false, createdAt: '2026-09-03T08:30:00Z', updatedAt: '2026-09-03T08:30:00Z' },
  { id: 2, name: 'Blue water bottle', description: 'Metal water bottle with a white mountain sticker on the side.', type: 'Found', location: 'Faculty of Computing Lab 2', date: '2026-09-03', contactInfo: '077 456 9821', imageUrl: '', isResolved: false, createdAt: '2026-09-03T12:15:00Z', updatedAt: '2026-09-03T12:15:00Z' },
  { id: 3, name: 'Student ID card', description: 'Student ID belonging to K. Perera, found near the cafeteria entrance.', type: 'Found', location: 'University Cafeteria', date: '2026-09-01', contactInfo: 'security@campus.lk', imageUrl: '', isResolved: true, createdAt: '2026-09-02T07:40:00Z', updatedAt: '2026-09-04T04:20:00Z' },
  { id: 4, name: 'Casio scientific calculator', description: 'Grey Casio fx-991ES calculator in a transparent cover.', type: 'Lost', location: 'Engineering Lecture Hall B', date: '2026-08-30', contactInfo: '071 234 8810', imageUrl: '', isResolved: false, createdAt: '2026-08-31T10:10:00Z', updatedAt: '2026-08-31T10:10:00Z' },
  { id: 5, name: 'Red umbrella', description: 'Compact red umbrella found after the afternoon lecture.', type: 'Found', location: 'Arts Building, Room 204', date: '2026-08-29', contactInfo: 'student.affairs@campus.lk', imageUrl: '', isResolved: false, createdAt: '2026-08-30T06:15:00Z', updatedAt: '2026-08-30T06:15:00Z' },
  { id: 6, name: 'USB flash drive', description: 'Black 32GB USB drive with a small green keyring.', type: 'Lost', location: 'IT Centre', date: '2026-08-28', contactInfo: '076 555 1274', imageUrl: '', isResolved: true, createdAt: '2026-08-29T13:25:00Z', updatedAt: '2026-09-01T09:00:00Z' },
]

const wait = () => new Promise((resolve) => setTimeout(resolve, 180))
const readLocal = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleItems))
  return sampleItems
}
const writeLocal = (items) => localStorage.setItem(STORAGE_KEY, JSON.stringify(items))

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/api/items${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options.headers } })
  if (!response.ok) {
    const error = new Error(response.status === 404 ? 'That report could not be found.' : 'We could not complete your request. Please try again.')
    error.status = response.status
    try { error.details = await response.json() } catch { /* no JSON body */ }
    throw error
  }
  return response.status === 204 ? null : response.json()
}

export async function getItems(filters = {}) {
  if (API_BASE) {
    const params = new URLSearchParams(Object.entries(filters).filter(([, value]) => value !== '' && value != null))
    return request(params.size ? `?${params}` : '')
  }
  await wait()
  const search = (filters.search || '').trim().toLowerCase()
  return readLocal().filter((item) =>
    (!search || [item.name, item.description, item.location].some((value) => value.toLowerCase().includes(search))) &&
    (!filters.type || item.type === filters.type) &&
    (filters.resolved === '' || filters.resolved == null || item.isResolved === (filters.resolved === 'true'))
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function getItem(id) {
  if (API_BASE) return request(`/${id}`)
  await wait()
  const item = readLocal().find((entry) => entry.id === Number(id))
  if (!item) { const error = new Error('That report could not be found.'); error.status = 404; throw error }
  return item
}

export async function createItem(values) {
  if (API_BASE) return request('', { method: 'POST', body: JSON.stringify(values) })
  await wait()
  const items = readLocal()
  const now = new Date().toISOString()
  const item = { ...values, id: Math.max(0, ...items.map(({ id }) => id)) + 1, isResolved: false, createdAt: now, updatedAt: now }
  writeLocal([item, ...items])
  return item
}

export async function updateItem(id, values) {
  if (API_BASE) return request(`/${id}`, { method: 'PUT', body: JSON.stringify(values) })
  await wait()
  const items = readLocal()
  const index = items.findIndex((entry) => entry.id === Number(id))
  if (index < 0) throw new Error('That report could not be found.')
  items[index] = { ...items[index], ...values, updatedAt: new Date().toISOString() }
  writeLocal(items)
  return items[index]
}

export async function resolveItem(id) {
  if (API_BASE) return request(`/${id}/resolve`, { method: 'PATCH' })
  const item = await getItem(id)
  const items = readLocal().map((entry) => entry.id === item.id ? { ...entry, isResolved: true, updatedAt: new Date().toISOString() } : entry)
  writeLocal(items)
  return items.find((entry) => entry.id === item.id)
}

export async function deleteItem(id) {
  if (API_BASE) return request(`/${id}`, { method: 'DELETE' })
  await wait()
  writeLocal(readLocal().filter((entry) => entry.id !== Number(id)))
}
