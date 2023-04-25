//product card function
const createCard = () => {
    let card = document.querySelectorAll('.product');
    

    card.innerHTML = `
    <h2 class="product-category">best selling</h2>
    <button class="pre-btn"><img src="img/arrow.png" alt=""></button>
<button class="nxt-btn"><img src="img/arrow.png" alt=""></button>
        <div class="product-container">
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="img/card1.png" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-des">a short line about the cloth..</p>
                    <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="img/card2.png" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-des">a short line about the cloth..</p>
                    <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
                </div>
            </div><div class="product-card">
            <div class="product-image">
                <span class="discount-tag">50% off</span>
                <img src="img/card3.png" class="product-thumb" alt="">
                <button class="card-btn">add to wishlist</button>
            </div>
            <div class="product-info">
                <h2 class="product-brand">brand</h2>
                <p class="product-short-des">a short line about the cloth..</p>
                <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
            </div>
        </div><div class="product-card">
        <div class="product-image">
            <span class="discount-tag">50% off</span>
            <img src="img/card4.png" class="product-thumb" alt="">
            <button class="card-btn">add to wishlist</button>
        </div>
        <div class="product-info">
            <h2 class="product-brand">brand</h2>
            <p class="product-short-des">a short line about the cloth..</p>
            <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
        </div>
    </div><div class="product-card">
    <div class="product-image">
        <span class="discount-tag">50% off</span>
        <img src="img/card5.png" class="product-thumb" alt="">
        <button class="card-btn">add to wishlist</button>
    </div>
    <div class="product-info">
        <h2 class="product-brand">brand</h2>
        <p class="product-short-des">a short line about the cloth..</p>
        <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
    </div>
</div>
<div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="img/card6.png" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-des">a short line about the cloth..</p>
                    <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="img/card7.png" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-des">a short line about the cloth..</p>
                    <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="img/card8.png" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-des">a short line about the cloth..</p>
                    <span class="price">1000.RS</span><span class="actual-price">2000.RS</span>
                </div>
            </div>
        </div>
    
    
    `;
}




createCard();



