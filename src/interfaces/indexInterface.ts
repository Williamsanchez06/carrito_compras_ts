export interface Product {
    id: number;
    name : string;
    image : string;
    description : string;
    price : number;
}

export interface CardItem extends Product {
    quantity : number;
}

export interface ProductProps {
    product : Product;
    addToCart: (product: Product) => void
}

export interface HeaderProps {
    cart : CardItem[];
    clearCart : () => void;
    increaseQuantity: (id: Product['id']) => void;
    decreaseQuantity: (id: Product['id']) => void;
    deleteToCart: (id: Product['id']) => void;
    buyTotal : number;
    isEmpty : boolean;
}
