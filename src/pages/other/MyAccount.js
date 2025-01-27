import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import MyOrder from "../../components/my-order/MyOrder";
import axios from "../../services/axiosInstance";
const MyAccount = () => {
  const [usuario, setUsuario] = useState({
    nome_completo: "",
    email: "",
    celular: "",
  });
  const [endereco, setEndereco] = useState({
    endereco_id: "",
    cep: "",
    cidade: "",
    estado: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
  });
  const [pedido, setPedido] = useState([]);
  let { pathname } = useLocation();
  const token = window.localStorage.getItem("jwt");
  const account = async () => {
    try {
      const response = await axios.get("/auth/my-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;
      setUsuario({
        nome_completo: userData.user.nome_completo,
        email: userData.user.email,
        celular: userData.user.celular,
      });

      setEndereco({
        endereco_id: userData.endereco[0].id,
        cep: userData.endereco[0].cep,
        estado: userData.endereco[0].estado,
        cidade: userData.endereco[0].cidade,
        bairro: userData.endereco[0].bairro,
        logradouro: userData.endereco[0].logradouro,
        numero: userData.endereco[0].numero,
        complemento: userData.endereco[0].complemento,
      });

      setPedido(userData.pedidos);
    } catch (error) {
      console.error("Erro ao buscar dados da conta:", error);
    }
  };

  const handleChangeUser = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleChangeAdress = (e) => {
    const { name, value } = e.target;
    setEndereco({
      ...endereco,
      [name]: value,
    });
  };
  const savePersonalInformation = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "/auth/edit-my-account",
      { usuario, endereco },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      account();
    }
  };

  useEffect(() => {
    account();
  }, []);
  return (
    <Fragment>
      <SEO
        titleTemplate="Eucompropravc | meu perfil"
        description="Visualizar meu perfil e pedidos da loja"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Início", path: process.env.PUBLIC_URL + "/" },
            { label: "Minha conta", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item
                      eventKey="0"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span></span> Edite as informações da sua conta{" "}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper text-center">
                            <h5>Seus dados pessoais</h5>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 col-md-6">
                              <div className="billing-info">
                                <label>Nome</label>
                                <input
                                  type="text"
                                  value={usuario.nome_completo}
                                  name="nome_completo"
                                  onChange={handleChangeUser}
                                />
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>E-mail</label>
                                <input
                                  type="email"
                                  name="email"
                                  value={usuario.email}
                                  onChange={handleChangeUser}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info">
                                <label>Celular</label>
                                <input
                                  type="text"
                                  name="celular"
                                  value={usuario.celular}
                                  onChange={handleChangeUser}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button
                                type="submit"
                                onClick={savePersonalInformation}
                              >
                                Salvar Dados
                              </button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="2"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span></span> Modifique os registros do seu catálogo de
                        endereços
                      </Accordion.Header>
                      <Accordion.Body id="endereco">
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4 className="text-center">
                              Registro catálogo de endereços
                            </h4>
                          </div>
                          <form>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Cep</label>
                                    <input
                                      type="text"
                                      value={endereco.cep}
                                      name="cep"
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Cidade</label>
                                    <input
                                      type="text"
                                      name="cidade"
                                      value={endereco.cidade}
                                      onChange={handleChangeAdress}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Estado</label>
                                    <input
                                      type="text"
                                      name="estado"
                                      value={endereco.estado}
                                      onChange={handleChangeAdress}
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                  <div className="billing-info">
                                    <label>Bairro</label>
                                    <input
                                      type="text"
                                      name="bairro"
                                      value={endereco.bairro}
                                      onChange={handleChangeAdress}
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-6">
                                  <div className="billing-info">
                                    <label>Logradouro</label>
                                    <input
                                      type="text"
                                      name="logradouro"
                                      value={endereco.logradouro}
                                      onChange={handleChangeAdress}
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-6">
                                  <div className="billing-info">
                                    <label>Número</label>
                                    <input
                                      type="text"
                                      name="numero"
                                      value={endereco.numero}
                                      onChange={handleChangeAdress}
                                    />
                                  </div>
                                </div>

                                <div className="col-lg-12 col-md-6">
                                  <div className="billing-info">
                                    <label>Complemento</label>
                                    <input
                                      type="text"
                                      name="complemento"
                                      value={endereco.complemento}
                                      onChange={handleChangeAdress}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button
                                  type="submit"
                                  onClick={savePersonalInformation}
                                >
                                  Salvar Alterações
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="3"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span></span> Meus pedidos
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <h4 className="my-order-header">Em andamento</h4>

                          <MyOrder pedidos={pedido} />

                          <h4 className="my-order-header">Finalizados</h4>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item
                      eventKey="1"
                      className="single-my-account mb-20"
                    >
                      <Accordion.Header className="panel-heading">
                        <span></span> Alterar senha
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="row">
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Nova Senha</label>
                                <input type="password" />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info">
                                <label>Confirmação de senha</label>
                                <input type="password" />
                              </div>
                            </div>
                          </div>
                          <div className="billing-back-btn">
                            <div className="billing-btn">
                              <button type="submit">Salvar Senha</button>
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;
