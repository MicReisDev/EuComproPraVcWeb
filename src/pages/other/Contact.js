import { Fragment } from "react"; 
import {Link, useLocation} from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Contact = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Contatos"
        description="Contatos da EuComproPraVoce. Entre em contato com a Eu compre pra você."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Início", path: process.env.PUBLIC_URL + "/" },
            {label: "Contatos", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="contact-area pt-30 pb-40">
          <div className="container">
            <div className="custom-row-2">
              <div className="col-12 col-lg-5 col-md-6">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <Link to="https://wa.me/5511958963287" target="_blank" rel="noopener noreferrer">
                      <div className="contact-info-dec">
                        <p>+55 11 95896-3287 </p>
                      </div>
                    </Link>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:contato@eucompropravoce.com">
                          contato@eucompropravoce.com
                        </a>
                      </p>
                      <p>
                        <a href="https://eucompropravoce.com.br/">
                          eucompropravoce.com.br
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Redes Sociais</h3>
                    <ul>
                      <li>
                        <a href="https://www.facebook.com/eucompropravoceoficial">
                          <i className="fa fa-facebook"/>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/eucompropravocebras/">
                          <i className="fa fa-instagram"/>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/@giseleoliveiraeucomproprav3338">
                          <i className="fa fa-youtube-play"/>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-7 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>Entre Em Contato</h2>
                  </div>
                  <form className="contact-form-style">
                    <div className="row">
                      <div className="col-lg-6">
                        <input name="name" placeholder="Nome*" type="text" />
                      </div>
                      <div className="col-lg-6">
                        <input name="email" placeholder="Email*" type="email" />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder="Assunto*"
                          type="text"
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Sua mensagem*"
                          defaultValue={""}
                        />
                        <button className="submit" type="submit">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
