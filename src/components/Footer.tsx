export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We are a team of developers who are passionate about creating
              high-quality software.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>
              Email: <a href="mailto:contact@example.com">contact@example.com</a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890">+123-456-7890</a>
            </p>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="https://www.facebook.com/yourpage">Facebook</a></li>
              <li><a href="https://www.twitter.com/yourpage">Twitter</a></li>
              <li><a href="https://www.instagram.com/yourpage">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} ChillDev. All rights reserved.</p>
      </div>
    </footer>
  )
}
