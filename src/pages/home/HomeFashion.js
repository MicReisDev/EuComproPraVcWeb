import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";

const HomeFashion = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="EuComproPraVoce"
        description="Compra em lotes de roupas do Brás e 25 de março por assessoria."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        <HeroSliderOne />

        <TabProduct spaceBottomClass="pb-60" spaceTopClass="pt-60" category="fashion" />

        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;
