
import { useShop } from "../../context/ShopContext";
import "./Shop.css";


function Shop() {
    const {coinpack,purchasepack} = useShop()

    console.log('coinpack shop',coinpack)
  

  return (
    <div className="coin-shop">

      {/* Header */}

      <div className="coin-shop-header">
        <div>
          <span className="shop-eyebrow">GAME STORE</span>
          <h1>Gold Coins</h1>
          <p>Get more coins and unlock your gaming experience.</p>
        </div>

        <div className="shop-wallet">
          <span>🪙</span>
          <div>
            <small>YOUR BALANCE</small>
            <h3>2,450 GC</h3>
          </div>
        </div>
      </div>

      {/* Packs */}

      <div className="coin-packs-grid">

        {coinpack?.map((pack) => (

          <div className="coin-pack-card" key={pack.id}>

            {pack.popular && (
              <div className="pack-popular">
                FRIEND FAVORITE
              </div>
            )}

            <div className="pack-image">
              <img src={pack.image} alt={`${pack.coins} gold coins`} />
            </div>

            <div className="pack-details">

              <div className="pack-quantity">
                <span className="mini-coin">🪙</span>
                {pack.coins}
                <span className="coin-unit">GC</span>
              </div>

              {pack.bonus && (
                <span className="pack-bonus">
                  + {pack.bonus} BONUS
                </span>
              )}

            </div>

            <button
              className="pack-price"
              onClick={() => purchasepack(pack.id)}
            >
              ₹{pack.price}
              <span> BUY NOW →</span>
            </button>

          </div>

        ))}

      </div>

      <div className="shop-bottom">
        <span>🔒 Secure Payments</span>
        <span>⚡ Instant Coin Delivery</span>
        <span>🎮 Enjoy Your Game</span>
      </div>

    </div>
  );
}

export default Shop;
