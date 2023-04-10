import { networkLinks, resourcesLinks, socials } from '@/mock'
import Image from 'next/legacy/image'
import Logo from '../logo/Logo'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.block}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.text}>
            <p>Experience the next generation of gaming with AI-powered technology.</p>
          </div>
        </div>
        <div className={styles.small_row}>
          <div className={styles.nav_block}>
            <div className={styles.text}>
              <h3>AIG Token Network</h3>
            </div>
            <ul className={styles.nav_section}>
              {networkLinks.map(({ title, url, external }, index) => (
                <li key={index} className={styles.nav_item}>
                  {external ? (
                    <a href={url} target="_blank" rel="noreferrer noopener" className={styles.header_menuLink}>
                      {title}
                    </a>
                  ) : (
                    <p data-active="false" data-nav-link-title={url} className={styles.header_menuLink}>
                      {title}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.nav_block}>
            <div className={styles.text}>
              <h3>Resources</h3>
            </div>
            <ul className={styles.nav_section}>
              {resourcesLinks.map(({ title, url, external }, index) => (
                <li key={index} className={styles.nav_item}>
                  {external ? (
                    <a href={url} target="_blank" rel="noreferrer noopener" className={styles.header_menuLink}>
                      {title}
                    </a>
                  ) : (
                    <p data-active="false" data-nav-link-title={url} className={styles.header_menuLink}>
                      {title}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.footer_footer}>
        <div className={styles.footer_socials}>
          {socials.map((item, index) => (
            <a href={item.url} target="_blank" rel="noreferrer noopener" key={index} className={styles.footer_social}>
              <Image src={item.icon} layout="fill" alt={item.title} title={item.title} />
            </a>
          ))}
        </div>
        <div className={styles.text}>
          <p style={{ color: '#A5ACAF' }}>
            © AIG Token, 2023. All rights reserved. |{' '}
            <a href={'#'} target="_blank" rel="noreferrer noopener">
              Privacy Policy
            </a>
            {'  '} | {'  '}
            <a href={'#'} target="_blank" rel="noreferrer noopener">
              Terms of Use
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
