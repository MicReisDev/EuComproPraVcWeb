import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const NotFound = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Não Encontrado"
        description="404 página do EuComproPraVoce não encontrada."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Início", path: process.env.PUBLIC_URL + "/" },
            { label: "Página 404", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <h1>404</h1>
                  <h2>OPS! PÁGINA NÃO ENCONTRADA</h2>
                  <p>
                    Desculpe, mas a página que você está procurando não existe, foi
                    removida, o nome foi alterado ou está temporariamente indisponível.
                  </p>
                  <Link to={process.env.PUBLIC_URL + "/"} className="error-btn">
                    Voltar para a página inicial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default NotFound;
