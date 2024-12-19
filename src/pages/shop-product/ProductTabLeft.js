import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const ProductTabLeft = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product.id === id);

  return (
    <Fragment>
      <SEO
        titleTemplate={`${product.name}`}
        description={`${product.shortDescription}`}
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Início", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Visualizando Produto",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-30"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="leftThumb"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          otherInfo={product.otherInformations}
          material={product.material}
          batchUnits={product.batchUnits}
        />
      </LayoutOne>
    </Fragment>
  );
};

export default ProductTabLeft;
