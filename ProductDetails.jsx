import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductDetails.css';

// Product data - same as homepage
const products = [
  { id:1, name:'Belgian Chocolate Truffle', flavor:'Rich Dark Chocolate', price:849, oldPrice:999, rating:5, reviews:238, tag:'Bestseller', img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', description:'Indulgent dark chocolate truffle cake with smooth ganache layers and premium cocoa dusting.' },
  { id:2, name:'Strawberry Dream Cake', flavor:'Fresh Strawberry Cream', price:749, oldPrice:0, rating:5, reviews:184, tag:'New', img:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', description:'Delicate sponge cake layered with fresh strawberry compote and silky whipped cream.' },
  { id:3, name:'Red Velvet Fantasy', flavor:'Cream Cheese Frosting', price:799, oldPrice:949, rating:4, reviews:312, tag:'', img:'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80', description:'Classic red velvet cake with premium cream cheese frosting and subtle vanilla notes.' },
  { id:4, name:'Mango Mousse Delight', flavor:'Fresh Alphonso Mango', price:899, oldPrice:0, rating:5, reviews:167, tag:'Seasonal', img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80', description:'Tropical mango-flavored sponge with airy mousse topping and fresh mango pieces.' },
  { id:5, name:'Classic Vanilla Bean', flavor:'Madagascar Vanilla', price:649, oldPrice:749, rating:4, reviews:421, tag:'', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description:'Timeless vanilla cake with Madagascar vanilla extract and smooth vanilla buttercream.' },
  { id:6, name:'Black Forest Royale', flavor:'Kirsch & Wild Cherry', price:929, oldPrice:0, rating:5, reviews:203, tag:'Premium', img:'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80', description:'Decadent Black Forest cake with dark chocolate, fresh cherries, and kirsch liqueur.' },
  { id:7, name:'Tiramisu Cloud Cake', flavor:'Espresso & Mascarpone', price:999, oldPrice:1199, rating:5, reviews:145, tag:'Chef\'s Pick', img:'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=80', description:'Exquisite Italian-inspired tiramisu with espresso-soaked ladyfingers and mascarpone cream.' },
  { id:8, name:'Lemon Drizzle Bliss', flavor:'Zesty Lemon Curd', price:729, oldPrice:0, rating:4, reviews:98, tag:'', img:'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=600&q=80', description:'Bright lemon cake with tangy lemon curd filling and delicate lemon drizzle glaze.' },
];

// Generate thumbnail gallery from Unsplash
const getThumbnails = (mainImg) => [
  mainImg,
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=150&q=80',
  'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=150&q=80',
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedWeight, setSelectedWeight] = useState('1 Kg');
  const [message, setMessage] = useState('');
  const [mainImage, setMainImage] = useState(product?.img || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const weights = ['0.5 Kg', '1 Kg', '1.5 Kg', '2 Kg', '4 Kg'];
  const thumbnails = getThumbnails(product.img);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      weight: selectedWeight,
      message,
      img: product.img,
    };
    
    let cart = JSON.parse(localStorage.getItem('cakeLounge_cart')) || [];
    cart.push(cartItem);
    localStorage.setItem('cakeLounge_cart', JSON.stringify(cart));
    
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
      cartBadge.textContent = cart.length;
    }
    
    // Toast notification
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = `🎂 ${product.name} added to cart!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  return (
    <motion.div
      className="product-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="back-button">
          <i className="fas fa-arrow-left"></i> Back
        </button>

        <div className="details-wrapper">
          {/* LEFT: Image Gallery */}
          <motion.div className="details-gallery" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <div className="main-image-container">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={product.name}
                className="main-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              {discount > 0 && (
                <div className="discount-badge">-{discount}%</div>
              )}
            </div>

            <div className="thumbnails">
              {thumbnails.map((thumb, idx) => (
                <motion.button
                  key={idx}
                  className={`thumbnail ${mainImage === thumb ? 'active' : ''}`}
                  onClick={() => setMainImage(thumb)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={thumb} alt={`View ${idx + 1}`} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Product Info */}
          <motion.div className="details-info" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            {/* Tag & Rating */}
            <div className="info-header">
              {product.tag && <span className="product-tag">{product.tag}</span>}
              <div className="rating-box">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa${i < product.rating ? 's' : 'r'} fa-star`}></i>
                  ))}
                </div>
                <span className="reviews">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Name & Description */}
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-flavor">{product.flavor}</p>
            <p className="product-detail-desc">{product.description}</p>

            {/* Price Section */}
            <div className="price-section">
              <span className="price">₹{product.price}</span>
              {product.oldPrice > 0 && (
                <span className="old-price">₹{product.oldPrice}</span>
              )}
            </div>

            {/* Delivery Info */}
            <div className="delivery-info">
              <div className="info-item">
                <i className="fas fa-truck"></i>
                <span>Free delivery on orders above ₹999</span>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <span>Order before 2 PM for same-day delivery</span>
              </div>
            </div>

            {/* Weight Selection */}
            <div className="weight-section">
              <label>Select Weight</label>
              <div className="weight-buttons">
                {weights.map((w) => (
                  <motion.button
                    key={w}
                    className={`weight-btn ${selectedWeight === w ? 'active' : ''}`}
                    onClick={() => setSelectedWeight(w)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {w}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Cake Message */}
            <div className="message-section">
              <label>Add a Message (Optional)</label>
              <textarea
                placeholder="Add a special message on the cake..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={100}
                rows="3"
              />
              <span className="char-count">{message.length}/100</span>
            </div>

            {/* Quantity */}
            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <motion.button
                className="btn-wishlist"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="far fa-heart"></i>
              </motion.button>
              <motion.button
                className="btn-add-cart"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-shopping-bag"></i> Add to Cart
              </motion.button>
              <motion.button
                className="btn-buy-now"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-bolt"></i> Buy Now
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="badge">
                <i className="fas fa-check-circle"></i>
                <span>100% Fresh</span>
              </div>
              <div className="badge">
                <i className="fas fa-shield-alt"></i>
                <span>Secure Payment</span>
              </div>
              <div className="badge">
                <i className="fas fa-undo"></i>
                <span>Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
