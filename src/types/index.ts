export interface User {
	_id: string;
	name: string;
	phone_no: string;
	address: string;
	location?: string;
	password: string;
	orders: Order[];
}

export interface Order {
	_id: string;
	date: Date;
	user: User;
	isSpecial: Boolean;
	orderMessage: String;
	rejectReson?: String;
	status: 'review' | 'approved' | 'delivered' | 'rejected';
	items: CartItem[];
	location?: string;
}

export interface CartItem {
	quantity: number;
	product: Product;
	message: string;
}

export interface Product {
	_id: string;
	name: string;
	description: string;
	imageUrl: string;
	price: string;
	owner: Owner;
	category: Category;
}

export interface Owner {
	_id: string;
	name: string;
	description: string;
	imageUrl: string;
	address: string;
	owner: string;
	productsCategories: Category[];
}

export interface Category {
	_id: string;
	name: string;
	products: Product[];
}
export interface Place {
	_id: string;
	name: string;
	icon: string;
}
