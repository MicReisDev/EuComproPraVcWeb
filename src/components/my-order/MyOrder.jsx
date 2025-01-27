import "../../assets/scss/_my-order.scss";
import React,{ useState } from "react";


const MyOrder = ({pedidos}) => {
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
              logradouro
            </th>
            <th className="th-table-order" scope="col">
              cep
            </th>
            <th className="th-table-order" scope="col">
              data do pedido
            </th>
            <th className="th-table-order" scope="col">
              status do pedido
            </th>
            <th className="th-table-order" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="td-table-order">{pedido.id}</td>
                <td className="td-table-order">{pedido.logradouro}</td>
                <td className="td-table-order">{pedido.cep}</td>
                <td className="td-table-order">{pedido.createdAt}</td>
                <td className="td-table-order">{pedido.status_pedido}</td>
                <td
                  className="td-table-order td-table-order--details"
                  onClick={() => handleDetails(index)}
                >
                  Ver detalhes
                </td>
              </tr>
              {expandedIndex === index && (
                pedido.pedido_produtos.map((product, index) => (
                  <tr>
                  <td colSpan="7" className="td-table-order-details">
                    <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', background:'white',    borderRadius: '0.5em',
    border: '1px solid #ccc'}}>
                
                        <div >
                          <p style={{ borderBottom: '1px solid #ccc' }}>
                          Produto:
                          </p>
                        <p>{product.nome}</p>
                        </div>

                        <div >
                          <p style={{ borderBottom: '1px solid #ccc' }}>
                          SKU:
                          </p>
                        <p>{product.sku}</p>
                        </div>
                        <div >
                          <p style={{ borderBottom: '1px solid #ccc' }}>
                          Descrição:
                          </p>
                        <p>{product.descricao}</p>
                        </div>

                        <div >
                          <p style={{ borderBottom: '1px solid #ccc' }}>
                          Quantidade:
                          </p>
                        <p>{product.quantidade}</p>
                        </div>
                        <div >
                          <p style={{ borderBottom: '1px solid #ccc' }}>
                          Material:
                          </p>
                        <p>{product.material}</p>
                        </div>
                        <div >
                          <p style={{ borderBottom: '1px solid #ccc' }}>
                          Valor:
                          </p>
                        <p>{product.valor}</p>
                        </div>

                    </div>
                  </td>
                </tr>
                ))

              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrder;
