import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import vector from "../../assets/svg/vector-login.svg";

const LoginRegister = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Entrar"
        description="Entre ou crie uma conta para aproveitar os produtos da EuComproPraVocê!"
      />
      <LayoutOne headerTop="visible">
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                <img
                  src={vector}
                  alt="image-login"
                  className="login-register-image"
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Entrar</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Cadastre-se</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="e-mail"
                                name="user-name"
                                placeholder="Email"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Senha"
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">
                                    Lembrar de mim
                                  </label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Esqueceu sua senha?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Entrar</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="Nome"
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Senha"
                              />
                              <input
                                name="user-email"
                                placeholder="E-mail"
                                type="email"
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Registrar-se</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
