export const formatDate = (date) => new Intl.DateTimeFormat('en-LK', {
  day: 'numeric', month: 'short', year: 'numeric',
}).format(new Date(`${date}T00:00:00`))
