import Product from '../services/product/product.type';
import {plainToClass} from 'class-transformer';

const loadProducts = (): Product[] => {

    return plainToClass(Product, [
        {
            "_id": {"$oid": "60585337601ae42c2455471e"},
            "id": 1,
            "name": "Banana",
            "slug": "banana",
            "unit": "8 pc(s)",
            "price": 10,
            "salePrice": 9,
            "discountInPercent": 10,
            "description": "A banana is an edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains distinguishing them from dessert bananas.",
            "type": "grocery",
            "image": "http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg",
            "gallery": [{"url": "http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg"}, {"url": "http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg"}, {"url": "http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg"}, {"url": "http://s3.amazonaws.com/redqteam.com/pickbazar/banana.jpg"}],
            "categories": [{"id": 1, "name": "Fruits Vegetables", "slug": "fruits-and-vegetables"}, {
                "id": 2,
                "name": "Fruits",
                "slug": "fruits"
            }]
        }]);
};

export default loadProducts;
