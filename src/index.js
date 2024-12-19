import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { setProducts } from "./store/slices/product-slice"
import 'animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import axios from "./services/axiosInstance";

async function fetchProducts() {
  try {
    const response = await axios.get('/produtos?populate=*&pagination[pageSize]=100');
    const cmsProducts = response.data.data;
    const products = cmsProducts.map((item) => {
      return {
        id: item.sku,
        sku: item.sku,
        name: item.nome,
        price: item.valor,
        discount: item.porcentagem_do_desconto || 0,
        category: [item.categoria],
        tag: item.tags ? item.tags.map((tag) => tag.nome) : [],
        image: item.imagens
          ? item.imagens.map((img) => img.url)
          : [],
        batchUnits: item.quantidade_no_lote,
        shortDescription: item.descricao || "Sem descrição disponível.",
        otherInformations: item.outras_informacoes || "Sem informações adicionais disponíveis.",
        material: item.material || "Sem informações disponíveis.",
      };
    });
    console.log(products);
    store.dispatch(setProducts(products));
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchProducts().then(() => {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <PersistProvider>
        <App />
      </PersistProvider>
    </Provider>
  );
});