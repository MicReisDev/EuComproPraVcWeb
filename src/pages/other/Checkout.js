import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import axios from "../../services/axiosInstance";
import Modal from "../../helpers/modal";
const Checkout = () => {
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [pedidoData, setPedidoData] = useState({
    forma_de_envio: "",
    data_entrega: "",
    horario: null,
  });
  const [modalMsg, setModalMsg] = useState("");

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const IsLogged = useSelector((state) => state.user.isLoggedIn);

  const token = window.localStorage.getItem("jwt");
  let cartTotalPrice = 0;

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    const minTime = "08:00";
    const maxTime = "19:00";

    if (selectedTime >= minTime && selectedTime <= maxTime) {
      setPedidoData({
        ...pedidoData,
        horario: selectedTime,
      });
    } else {
      event.target.value = null;
      setModalMsg("Por favor, selecione um horário entre 08:00 e 19:00.");
      openModal();
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const today = new Date(); // Data atual
    const minDate = new Date(today.setDate(today.getDate() + 3));

    selectedDate.setHours(0, 0, 0, 0);
    minDate.setHours(0, 0, 0, 0);

    if (selectedDate >= minDate) {
      setPedidoData({
        ...pedidoData,
        data_entrega: event.target.value,
      });
    } else {
      event.target.value = null;
      setModalMsg(
        `Prazo de entrega 3 dias corridos após a compra. por favor, selecione uma data a partir de ${minDate.toLocaleDateString(
          "pt-BR"
        )}`
      );
      openModal();
    }
  };

  const account = async () => {
    try {
      const response = await axios.get("/auth/my-account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = response.data;

      setEndereco({
        endereco_id: userData.endereco[0].id,
        cep: userData.endereco[0].cep,
        cidade: userData.endereco[0].cidade,
        bairro: userData.endereco[0].bairro,
        logradouro: userData.endereco[0].logradouro,
        numero: userData.endereco[0].numero,
        estado: userData.endereco[0].estado,
        complemento: userData.endereco[0].complemento,
      });
    } catch (error) {
      console.error("Erro ao buscar dados da conta:", error);
    }
  };

  const handleChangeAdress = (e) => {
    const { name, value } = e.target;
    setPedidoData({
      ...pedidoData,
      [name]: value,
    });
  };

  const createPixPayment = async () => {
    try {
      console.log(pedidoData);
      const response = await axios.post(
        "/payments/pix",
        {
          amount: 100.0,
          description: "Pagamento de Teste",
          payer: {
            email: "cliente@example.com",
            first_name: "Nome",
            last_name: "Sobrenome",
            identification: {
              type: "CPF",
              number: "12345678900",
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const qrCodeBase64 = response.data;
      console.log(qrCodeBase64);
      setQrCodeBase64(qrCodeBase64);
    } catch (error) {
      console.error("Error creating Pix payment:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    account();
  }, []);

  return (
    <Fragment>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>{modalMsg}</p>
        <button
          style={{
            border: "2px",
            padding: "0.3em 0.5em",
            borderRadius: "0.5em",
          }}
          onClick={closeModal}
        >
          Ok
        </button>
      </Modal>
      <SEO
        titleTemplate="Checkout"
        description="Finalize sua compra na EuComproPraVocê!"
      />
      <LayoutOne headerTop="visible">
        {!qrCodeBase64 ? (
          <div className="checkout-area pt-60 pb-100">
            <div className="container">
              {cartItems && cartItems.length >= 1 ? (
                <div className="row">
                  {IsLogged ? (
                    <div className="col-lg-7">
                      <div className="billing-info-wrap">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h3>Endereço de entrega</h3>
                          <Link
                            to="/my-account#endereco"
                            style={{
                              borderRadius: "0.5em",
                              padding: "0.5em 1em",
                              background: "#fff9fa",
                            }}
                          >
                            Editar Endereço
                          </Link>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className=" mb-20">
                              <div className="adress-container">
                                <label>Rua</label>
                                <p className="address-display">
                                  {endereco.logradouro ||
                                    "Endereço não informado"}
                                </p>

                                <label>Número</label>
                                <p className="address-display">
                                  {endereco.numero || "Número não informado"}
                                </p>

                                <label>Complemento</label>
                                <p className="address-display">
                                  {endereco.complemento || "Não informado"}
                                </p>

                                <label>Cidade</label>
                                <p className="address-display">
                                  {endereco.cidade || "Cidade não informada"}
                                </p>

                                <label>Estado</label>
                                <p className="address-display">
                                  {endereco.estado || "Estado não informado"}
                                </p>

                                <label>CEP</label>
                                <p className="address-display">
                                  {endereco.cep || "00000-000"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-select mb-20">
                              <label>Forma de envio</label>
                              <select
                                className="form-select"
                                name="forma_de_envio"
                                onChange={handleChangeAdress}
                              >
                                <option selected disabled>
                                  Selecione um envio
                                </option>
                                <option value={"1"}>Correios</option>
                                <option value={"2"}>Excursão</option>
                                <option value={"3"}>Transportadora</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Data para entrega</label>
                              <input
                                className="form-select"
                                type="date"
                                name="data_entrega"
                                onChange={handleDateChange}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label htmlFor="appointment-time">
                                Horário para entrega
                              </label>
                              <input
                                type="time"
                                id="appointment-time"
                                name="horario"
                                value={pedidoData.horario}
                                onChange={handleTimeChange}
                                min="08:00"
                                max="19:00"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-lg-7">
                      <div className="billing-info-wrap">
                        <h3>Endereço de entrega</h3>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-select mb-20">
                            <label>Forma de envio</label>
                            <select className="form-select">
                              <option selected disabled>
                                Selecione um envio
                              </option>
                              <option value={"1"}>Correios</option>
                              <option value={"2"}>Excursão</option>
                              <option value={"3"}>Transportadora</option>
                            </select>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label>Nome Completo</label>
                              <input type="text" />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label></label>
                              <input
                                className="billing-address"
                                placeholder="Endereço e número"
                                type="text"
                              />
                              <input
                                placeholder="Apartamento, bloco, etc. (opcional)"
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="billing-info mb-20">
                              <label></label>
                              <input type="text" />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-select mb-20">
                              <label></label>
                              <select className="form-select">
                                <option selected disabled>
                                  Selecione um estado
                                </option>
                                <option>São Paulo</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Telefone</label>
                              <input
                                maxLength={15}
                                type="text"
                                placeholder="(xx) xxxxx-xxxx"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Email</label>
                              <input
                                type="text"
                                placeholder="email@example.com"
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Data para entrega</label>
                              <input className="form-select" type="date" />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label htmlFor="appointment-time">
                                Horário para entrega
                              </label>
                              <input
                                type="time"
                                id="appointment-time"
                                name="appointment-time"
                                // value={time}
                                min="08:00"
                                max="18:00"
                                // onChange={handleTimeChange}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Seu Pedido</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Produto</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(
                                  cartItem.price,
                                  cartItem.discount
                                );
                                const finalProductPrice = (
                                  cartItem.price * currency.currencyRate
                                ).toFixed(2);
                                const finalDiscountedPrice = (
                                  discountedPrice * currency.currencyRate
                                ).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice +=
                                      finalDiscountedPrice * cartItem.quantity)
                                  : (cartTotalPrice +=
                                      finalProductPrice * cartItem.quantity);
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? currency.currencySymbol +
                                          (
                                            finalDiscountedPrice *
                                            cartItem.quantity
                                          ).toFixed(2)
                                        : currency.currencySymbol +
                                          (
                                            finalProductPrice *
                                            cartItem.quantity
                                          ).toFixed(2)}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">
                                Entrega<span className="contrast">*</span>
                              </li>
                              <li>Calculado e pago posteriormente</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>
                                {currency.currencySymbol +
                                  cartTotalPrice.toFixed(2)}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button
                          onClick={createPixPayment}
                          className="btn-hover"
                        >
                          Pagar
                        </button>
                      </div>
                    </div>
                    <div className="info-frete">
                      <span className="contrast">*</span>
                      <b>Atenção!</b> O frete será calculado e cobrado
                      posteriormente pelo prestador, entrega disponível à partir
                      de 3 dias após o pedido e em horário comercial
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="item-empty-area text-center">
                      <div className="item-empty-area__icon mb-30">
                        <i className="pe-7s-cash"></i>
                      </div>
                      <div className="item-empty-area__text">
                        Nenhum item foi encontrado no seu carrinho
                        <br />{" "}
                        <Link to={process.env.PUBLIC_URL + "/"}>
                          Comprar agora
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            height={300}
            width={300}
            alt="QR Code Pix"
          />
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
