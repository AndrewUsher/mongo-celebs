const parseName = name => {
  const hasComma = name.includes(',')
  const hasParens = name.includes('(')
  if (hasComma) {
    return name.slice(0, name.indexOf(','))
  }
  if (hasParens) {
    return name.slice(0, name.indexOf('(') - 1)
  }
  return name.trim()
}

const data = [...document.querySelectorAll('.face')].map(celeb => ({
  date: `09-${window.location.pathname.slice(10, 12)}`,
  image: celeb.style.background.replace('url("', '').slice(0, celeb.style.background.replace('url("', '').indexOf('"')),
  name: parseName(celeb.querySelector('.name').innerText)
}))

console.log('celeb', JSON.stringify(data))
