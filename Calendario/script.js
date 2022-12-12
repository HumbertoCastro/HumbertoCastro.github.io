function updateATag(originalLink, newLink) {
  const allAlinks = [...document.querySelectorAll('a')];
  allAlinks.filter((a) => a.href === originalLink).forEach((newHref) => {
    newHref.href = newLink;
  });
}

document.body.innerHTML = `<a href='https://www.google.com/'>Original</a>`;

updateATag('https://www.google.com/', 'https://www.w3schools.com/');