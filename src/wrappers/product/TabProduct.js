import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGrid";

const TabProduct = ({
  spaceTopClass,
  spaceBottomClass,
  bgColorClass,
}) => {
  return (
    <div
      className={clsx("product-area", spaceTopClass, spaceBottomClass, bgColorClass)}
    >
      <div className="container">
        <SectionTitle titleText="CONFIRA JÁ!" positionClass="text-center" />
        <Tab.Container defaultActiveKey="Nacional">
          <Nav
            variant="pills"
            className="product-tab-list pb-55 text-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="Nacional">
                <h4>Nacional</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Internacional">
                <h4>Internacional</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="Nacional">
              <div className="row">
                <ProductGrid
                  category="Nacional"
                  limit={100}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="Internacional">
              <div className="row">
                <ProductGrid
                  category="Internacional"
                  limit={100}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div >
  );
};

TabProduct.propTypes = {
  bgColorClass: PropTypes.string,
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default TabProduct;
