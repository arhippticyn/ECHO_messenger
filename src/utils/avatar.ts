export const getAvatarColor = (name: string) => {
  const colors = [
    '#e17076',
    '#faa774',
    '#a695e7',
    '#7bc862',
    '#6ec9cb',
    '#65aadd',
    '#ee7aae',
  ]

  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length

  return colors[index]
}
