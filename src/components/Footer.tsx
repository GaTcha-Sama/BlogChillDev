export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="about">
            <h5>À propos de nous</h5>
            <p>
              Blog réalisé par un groupe d'étudiants de Learn IT Brest
            </p>
          </div>
          <div className="contact">
            <h5>Contactez-nous</h5>
            <p>
              Email: <a href="mailto:contact@example.com">contact@brest-opencampus.fr</a>
            </p>
            <p>
              Téléphone: <a href="tel:+1234567890">02.98.49.22.99</a>
            </p>
          </div>
          <div className="follow">
            <h5>Suivez-nous</h5>
            <ul className="list-medias">
              <li><a href="https://reseau-opencampus.com/open-campus-brest/" target="_blank" rel="noopener noreferrer">Site officiel</a></li>
              <li><a href="https://www.facebook.com/opencampus.off/?locale=fr_FR" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/opencampus_off/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyrights">
        <p>&copy; {new Date().getFullYear()} ChillDev Learn IT. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
