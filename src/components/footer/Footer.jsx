import './footer.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
function Footer({ currentYear }) {
  return (
    <footer className='footer'>
      <section className='footer__media'>
        <InstagramIcon />
        <TwitterIcon />
        <FacebookIcon />
      </section>
      <p>© {currentYear} Abdulrahman Ismael. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
