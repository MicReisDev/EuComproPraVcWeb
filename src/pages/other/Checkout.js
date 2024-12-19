import { Fragment, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";

const Checkout = () => {
  const [shipAddress, setShipAddress] = useState("");

  let cartTotalPrice = 0;

  const labels = useMemo(() => {
    const isExcursao = shipAddress === "2";
    return {
      address: isExcursao ? "Endereço excursão" : "Endereço",
      city: isExcursao ? "Cidade excursão" : "Cidade",
      state: isExcursao ? "Estado excursão" : "Estado",
      nameGuide: isExcursao ? "Nome Guia" : "",
    };
  }, [shipAddress]);

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Finalize sua compra na EuComproPraVocê!"
      />
      <LayoutOne headerTop="visible">
        <div className="checkout-area pt-60 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Endereço de entrega</h3>
                    <div className="col-lg-6 col-md-6">
                      <div className="billing-select mb-20">
                        <label>Forma de envio</label>
                        <select
                          className="form-select"
                          onChange={(e) => setShipAddress(e.target.value)}
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
                    {shipAddress === "2" && (
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Nome Guia excursão</label>
                          <input type="text" />
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Nome Completo</label>
                          <input type="text" />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>{labels.address}</label>
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
                          <label>{labels.city}</label>
                          <input type="text" />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="billing-select mb-20">
                          <label>{labels.state}</label>
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
                          <label>CEP</label>
                          <input type="text" placeholder="00000-000" />
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
                          <input type="text" placeholder="email@example.com" />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Data para entrega</label>
                          <input className="form-select" type="date" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                                          finalProductPrice * cartItem.quantity
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
                            <li>R$ 0</li>
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
                      <button className="btn-hover">Pagar</button>
                    </div>
                  </div>
                  <div className="info-frete">
                    <span className="contrast">*</span>
                    <b>Atenção!</b> O frete será calculado e cobrado
                    posteriormente pelo prestador.{" "}
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
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
