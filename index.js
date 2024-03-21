const PRODUCTS = [
  {
    id: 1,
    nombre: "Camiseta básica",
    precio: 15.99,
    categoria: "Ropa",
    img: "https://todocofrade.com/wp-content/uploads/2019/11/106-34.png",
    cantidad: 1
  },
  {
    id: 2,
    nombre: "Pantalón vaquero",
    precio: 29.99,
    categoria: "Ropa",
    img: "https://www.motosdakar.es/wp-content/uploads/2021/07/TEJANO-II-LADY-1.png",
    cantidad: 1
  },
  {
    id: 3,
    nombre: "Zapatillas deportivas",
    precio: 49.99,
    categoria: "Calzado",
    img: "https://img.kwcdn.com/product/open/2023-09-07/1694051384919-4ee8734277c141efacfe049000e9bec7-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
    cantidad: 1
  },
  {
    id: 4,
    nombre: "Teléfono móvil",
    precio: 299.99,
    categoria: "Tecnología",
    img: "https://cdn.phonehouse.es/res_static/cmsmaker/D6EE2F8339BEC9E0EFD1B9F4756E2045.jpg?auto=format",
    cantidad: 1
  },
  {
    id: 5,
    nombre: "Auriculares inalámbricos",
    precio: 79.99,
    categoria: "Tecnología",
    img: "https://shop.jvc.es/wp-content/uploads/2022/09/JVC_HA-A9T-B_Earbud.png",
    cantidad: 1
  },
  {
    id: 6,
    nombre: "Libro de ficción",
    precio: 12.5,
    categoria: "Libros",
    img: "https://aliarediciones.es/wp-content/uploads/2019/07/Camino-entre-realidad-y-ficci%C3%B3n-600x600.png",
    cantidad: 1
  },
  {
    id: 7,
    nombre: "Reloj de pulsera",
    precio: 99.5,
    categoria: "Accesorios",
    img: "https://ae01.alicdn.com/kf/S7af94f9417b948329b224fbb5ea1b2f3x/Reloj-de-pulsera-de-cuarzo-para-hombre-cron-grafo-de-pulsera-de-f-brica-gran-oferta.png",
    cantidad: 1
  },
  {
    id: 8,
    nombre: "Mochila escolar",
    precio: 24.99,
    categoria: "Accesorios",
    img: "https://www.totto.es/dw/image/v2/BFJS_PRD/on/demandware.static/-/Sites-master-catalog-AX/default/dwa273507f/FOTOSALTA/T.221/MA04ECO002-2120N-3CE_1.png?sh=650",
    cantidad: 1
  },
  {
    id: 9,
    nombre: "Lámpara de escritorio",
    precio: 34.99,
    categoria: "Hogar",
    img: "https://www.fluxs.es/wp-content/uploads/2021/11/Lampara-de-escritorio-LED-con-cargador-inalambrico-VELA.png",
    cantidad: 1
  },
  {
    id: 10,
    nombre: "Set de utensilios de cocina",
    precio: 39.99,
    categoria: "Hogar",
    img: "https://www.bastilipo.com/wp-content/uploads/2018/12/Basilea.MAIN_.png.webp",
    cantidad: 1
  },
];

const carritoLleno = JSON.parse(localStorage.getItem("productsCart")) || [];

const printProductsContent = (products) => {
  const divContent = document.querySelector(".content");
  divContent.innerHTML = "";

  for (const product of products) {
    const div = document.createElement("div");
    const name = document.createElement("h3");
    const price = document.createElement("p");
    const divImg = document.createElement("div");
    const img = document.createElement("img");
    const cart = document.createElement("img");
    const p = document.createElement('span')
    name.textContent = product.nombre;
    price.textContent = product.precio;
    img.src = product.img;
    divImg.classList.add("div-img");
    div.classList.add("product");
    cart.classList.add("cart-img");
    cart.src = "https://cdn-icons-png.flaticon.com/512/5465/5465858.png";
    div.append(cart);
    div.append(name);
    div.append(divImg);
    div.append(price);
    divImg.append(img);
    divContent.append(div);
    if(carritoLleno){
      const totalSumElement = document.querySelector("#totalSum");
      totalSumElement.style.display = "none";
    }
    cart.addEventListener("click", () => {
      const existingProduct = carritoLleno.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.cantidad += 1;
      } else {
        carritoLleno.push(product);
      }
      localStorage.setItem("productsCart", JSON.stringify(carritoLleno));
      actualizarCarrito(carritoLleno);
    });
  }
};

const carrito = document.querySelector(".carrito");

carrito.addEventListener("click", () => {
  const cartDiv = document.querySelector(".cart");
  cartDiv.classList.toggle("openned");
});


const cart = document.querySelector(".cart");
cart.innerHTML = "";

const actualizarCarrito = (products) => {
  cart.innerHTML = "";
  let totalSumValue = 0;
  
  products.forEach(product => {
      const divProduct = document.createElement("div");
      const imgProduct = document.createElement("img");
      const divSpan = document.createElement('div')
      const numberSpan = document.createElement('span')
      const lessSpan = document.createElement('span')
      const sumSpan = document.createElement('span')
      const cartTotal = document.createElement('span')
      imgProduct.src = product.img;
      divProduct.className = 'cart-div'
      divSpan.className = "div-span"
      numberSpan.textContent = product.cantidad;
      const totalPrice = product.precio * product.cantidad;
      cartTotal.textContent = totalPrice + "€";
      totalSumValue += totalPrice;
      lessSpan.classList = "fa-solid fa-minus";
      sumSpan.classList = "fa-solid fa-plus";
      divSpan.append(lessSpan, numberSpan, sumSpan);
      divProduct.append(imgProduct, divSpan, cartTotal);
      cart.append(divProduct);
      lessSpan.addEventListener("click", () => restarProducto(product, divProduct, numberSpan, cartTotal, products));
      sumSpan.addEventListener("click", () => sumarProducto(product, numberSpan, cartTotal, products));
  });
      const totalSum = document.createElement('span');
      totalSum.id = 'totalSum'
      totalSum.textContent = "Total: " + totalSumValue.toFixed(2) + "€"; 
      cart.append(totalSum); 
      actualizarPrecioTotal(products);
}

const restarProducto = (producto, divProducto, spanCantidad, cartTotal, products) => {
    if (producto.cantidad > 1) {
        producto.cantidad--;
        spanCantidad.textContent = producto.cantidad;
        cartTotal.textContent = (producto.precio * producto.cantidad).toFixed(2) + "€"
        
    } else {
        const index = carritoLleno.findIndex(item => item.id === producto.id);
        if (index !== -1) {
            carritoLleno.splice(index, 1);
        }
        divProducto.remove();
        if(carritoLleno.length === 0){
        const totalSumElement = document.querySelector("#totalSum");
        totalSumElement.remove()
        }
    }
    guardarCarrito();
    actualizarPrecioTotal(products)
}

const sumarProducto = (producto, spanCantidad, totalSpan, products) => {
    producto.cantidad++;
    spanCantidad.textContent = producto.cantidad;
    totalSpan.textContent = (producto.precio * producto.cantidad).toFixed(2) + "€"
    guardarCarrito();
    actualizarPrecioTotal(products)
}

const actualizarPrecioTotal = (products) => {
  let totalSumValue = 0; 
  
  
  for (const product of products) {
      totalSumValue += product.precio * product.cantidad;
  }
  
  
  const totalSumElement = document.querySelector("#totalSum");
  totalSumElement.textContent = "Total: " + totalSumValue.toFixed(2) + "€";
}

const guardarCarrito = () => {
    localStorage.setItem("productsCart", JSON.stringify(carritoLleno));
}

actualizarCarrito(carritoLleno);
printProductsContent(PRODUCTS);