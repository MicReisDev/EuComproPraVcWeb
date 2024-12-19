import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";

const ProductDescriptionTab = ({
  spaceBottomClass,
  otherInfo,
  material,
  batchUnits
}) => {
  return (
    <div className={clsx("description-review-area", spaceBottomClass)}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="additionalInfo">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Informações Adicionais
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Quantidade de peças no lote</span> {batchUnits}
                    </li>
                    <li>
                      <span>Material</span> {material}
                    </li>
                    <li>
                      <span>Outras Informações</span> {otherInfo}
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  spaceBottomClass: PropTypes.string,
  otherInfo: PropTypes.string,
  material: PropTypes.string,
  batchUnits: PropTypes.number
};

export default ProductDescriptionTab;
