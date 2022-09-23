const checkLinkUrl = async (e: Event) => {
  const target = e.target as HTMLButtonElement

  if (target.value.length) target.classList.remove('undefinedText')
  else target.classList.add('undefinedText')

  if (isValidUrl(target.value)) {
    target.classList.remove('invalidText')
    target.classList.add('validText')
  } else {
    target.classList.add('invalidText')
    target.classList.remove('validText')
  }
}

const linkFix = (link: string | undefined) => {
  if (link == undefined || !link.length) return undefined
  if (!/^https?:\/\//i.test(link)) {
    return 'https://' + link
  }

  return link
}

const isValidUrl = (_string: string) => {
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/
  return matchPattern.test(_string)
}

export { checkLinkUrl, isValidUrl, linkFix }
