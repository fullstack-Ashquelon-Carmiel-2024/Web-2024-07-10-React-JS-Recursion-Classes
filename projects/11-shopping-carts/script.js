const avatarStockEl = document.querySelector(`.customer-avatars .stock`);
const cartStockEl = document.querySelector(`.carts .stock`);
const productShelvesEl = document.querySelector(`.products .stock`);


class Stock {

   constructor() {

   }


}

const clientAvatarStock = new Stock(avatarStockEl,avatarIconNames);

const newIcon = document.createElement('i');

const newClientAvatar = new Avatar(newIcon,iconClasses);

const cartAvatarStock = new Stock(cartStockEl, cartIconNames);

class ProductStock extends Stock