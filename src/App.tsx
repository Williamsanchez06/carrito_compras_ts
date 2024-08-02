import Header from "./components/Header";
import Product from "./components/Product";
import { useCart } from "./hooks/useCart";

function App() {

    const {
        data,
        cart,
        clearCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteToCart,
        buyTotal,
        isEmpty
    } = useCart();

    return (
        <>
            <Header
                cart={cart}
                clearCart={clearCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                deleteToCart={deleteToCart}
                buyTotal={buyTotal}
                isEmpty={isEmpty}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">

                    {data.map( product => (

                        <Product
                            key={ product.id }
                            product={ product }
                            addToCart={addToCart}
                        />

                    ))};

                </div>

            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
