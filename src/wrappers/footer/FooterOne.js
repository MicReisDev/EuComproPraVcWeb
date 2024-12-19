import PropTypes from "prop-types";
import clsx from "clsx";
import FooterCopyright from "../../components/footer/FooterCopyright";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}) => {
  return (
    <footer
      className={clsx(
        "footer-area",
        backgroundColorClass,
        spaceTopClass,
        spaceBottomClass,
        extraFooterClass,
        spaceLeftClass,
        spaceRightClass
      )}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="row">
          <div
            className={`${
              sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
            }`}
          >
            {/* footer copyright */}
            <FooterCopyright
              footerLogo="/assets/img/logo/logo.svg"
              spaceBottomClass="mb-30"
            />
          </div>

          <div
            className={`${
              sideMenu ? "col-xl-3 col-sm-8" : "col-lg-10 col-sm-6"
            }`}
          >
            <div
              className={`${
                sideMenu
                  ? "footer-widget mb-30 ml-145"
                  : "footer-widget mb-30 mt-70 ml-75 "
              } ${window.innerWidth < 768 ? "" : "text-end"}`}
            >
              <div className="footer-title">
                <h3>REDES SOCIAIS</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/eucompropravoceoficial/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook"></i>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/eucompropravocebras"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-instagram"></i>
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/@giseleoliveiraeucomproprav3338"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-youtube-play"></i>
                      Youtube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default FooterOne;
