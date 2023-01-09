import footerStyles from './footer.module.scss'

function Footer() {
  console.log('Footer render')
  return (
    <footer className={footerStyles.container}>
      <h1 className={footerStyles.text}>
        Это footer
      </h1>
    </footer>
  )
}

export {
  Footer,
}
