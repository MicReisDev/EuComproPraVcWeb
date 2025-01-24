import "../../assets/scss/_my-order.scss";
import { useState } from "react";
const products = [
  {
    item: "/assets/img/product/fashion/clothes.jpg",
    description:
      "Conjunto plus size (G1 G2 G3) de algodão pacote com 48 peças, sendo elas 24 camiseta e 24 shorts.",
    order: "45478",
    quantity: 2,
    total: "R$ 298,99",
    status: "Separação",
    delivery: "02/01/2025",
    shipping: "Correios",
  },
  {
    item: "/assets/img/product/fashion/clothes3.jpg",
    description:
      "Pacote com 36 camisetas estampadas unissex, confeccionadas em algodão premium, tamanhos variados (P M G GG).",
    order: "45479",
    quantity: 1,
    total: "R$ 198,99",
    status: "Entregue",
    delivery: "02/01/2025",
    shipping: "Transportadora",
  },
  {
    item: "/assets/img/product/fashion/clothes3.jpg",
    description:
      "Conjunto esportivo masculino em poliéster, composto por 30 unidades: 15 camisetas regatas e 15 bermudas.",
    order: "45480",
    quantity: 3,
    total: "R$ 598,99",
    status: "Entregue",
    delivery: "02/01/2025",
    shipping: "Excursão",
  },
  {
    item: "/assets/img/product/fashion/clothes.jpg",
    description:
      "Vestidos femininos estampados, pacote com 20 peças em tamanhos únicos, tecido leve e confortável.",
    order: "45481",
    quantity: 1,
    total: "R$ 198,99",
    status: "Entregue",
    delivery: "02/01/2025",
    shipping: "Correios",
  },
  {
    item: "/assets/img/product/fashion/clothes.jpg",
    description:
      "Pacote de roupas infantis, composto por 50 peças: 25 camisetas e 25 calças, com temas de desenhos animados.",
    order: "45482",
    quantity: 2,
    total: "R$ 298,99",
    status: "Entregue",
    delivery: "02/01/2025",
    shipping: "Correios",
  },
  {
    item: "/assets/img/product/fashion/clothes.jpg",
    description:
      "Conjunto de moda praia feminina, pacote com 40 peças: 20 biquínis e 20 saídas de praia, tamanhos variados.",
    order: "45483",
    quantity: 1,
    total: "R$ 198,99",
    status: "Entregue",
    delivery: "02/01/2025",
    shipping: "Transportadora",
  },
];

const MyOrder = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div className="table-responsive">
      <table className="table text-center">
        <thead className="thead-light text-uppercase">
          <tr>
            <th className="th-table-order" scope="col">
              Nº Pedido
            </th>
            <th className="th-table-order" scope="col">
              Qnt
            </th>
            <th className="th-table-order" scope="col">
              Total
            </th>
            <th className="th-table-order" scope="col">
              Situação
            </th>
            <th className="th-table-order" scope="col">
              Previsão de entrega
            </th>
            <th className="th-table-order" scope="col">
              Forma de envio
            </th>
            <th className="th-table-order" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="td-table-order">{product.order}</td>
                <td className="td-table-order">{product.quantity}</td>
                <td className="td-table-order">{product.total}</td>
                <td className="td-table-order">{product.status}</td>
                <td className="td-table-order">{product.delivery}</td>
                <td className="td-table-order">{product.shipping}</td>
                <td
                  className="td-table-order td-table-order--details"
                  onClick={() => handleDetails(index)}
                >
                  Ver detalhes
                </td>
              </tr>
              {expandedIndex === index && (
                <tr>
                  <td colSpan="7" className="td-table-order-details">
                    <div className="order-details">
                      <div className="order-details__item">
                        <img
                          className="order-details__img"
                          src={process.env.PUBLIC_URL + product.item}
                          alt="Detalhes do produto"
                        />
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
