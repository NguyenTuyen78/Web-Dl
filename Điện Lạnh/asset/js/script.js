document.addEventListener("DOMContentLoaded", function() {
    // Mảng chứa thông tin sản phẩm
    const products = [
        { name: "Máy giặt", description: "Máy giặt lồng ngang", price: "7,000,000 VND", imgSrc: "product1.jpg" },
        { name: "Tủ lạnh", description: "Tủ lạnh 2 cánh", price: "9,500,000 VND", imgSrc: "product2.jpg" },
        { name: "Điều hòa", description: "Điều hòa Inverter", price: "15,000,000 VND", imgSrc: "product3.jpg" },
        { name: "Lò vi sóng", description: "Lò vi sóng Sharp", price: "3,200,000 VND", imgSrc: "product4.jpg" },
        { name: "Máy sấy", description: "Máy sấy quần áo", price: "5,000,000 VND", imgSrc: "product5.jpg" },
        { name: "Máy hút bụi", description: "Máy hút bụi mini", price: "2,500,000 VND", imgSrc: "product6.jpg" }
    ];

    const productsPerPage = 3; // Số sản phẩm hiển thị mỗi trang
    let currentPage = 1; // Trang hiện tại

    // Lấy các phần tử cần thao tác
    const productGrid = document.querySelector(".product-grid");
    const pagination = document.querySelector(".pagination ul");

    // Hàm để hiển thị sản phẩm trên mỗi trang
    function renderProducts(page) {
        // Tính chỉ số sản phẩm bắt đầu và kết thúc
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        // Dọn dẹp nội dung hiện tại trong grid
        productGrid.innerHTML = "";

        // Hiển thị các sản phẩm cho trang hiện tại
        for (let i = startIndex; i < endIndex && i < products.length; i++) {
            const product = products[i];

            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            productItem.innerHTML = `
                <img src="${product.imgSrc}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>${product.price}</p>
                <button>Thêm vào giỏ</button>
            `;

            productGrid.appendChild(productItem);
        }

        // Cập nhật phân trang
        renderPagination(page);
    }

    // Hàm để hiển thị số trang phân trang
    function renderPagination(page) {
        const totalPages = Math.ceil(products.length / productsPerPage);
        pagination.innerHTML = ""; // Dọn dẹp phân trang hiện tại

        // Thêm nút "Previous"
        if (page > 1) {
            const prevButton = document.createElement("li");
            prevButton.innerHTML = `<a href="#">Previous</a>`;
            prevButton.addEventListener("click", function() {
                renderProducts(page - 1);
            });
            pagination.appendChild(prevButton);
        }

        // Thêm các nút trang
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("li");
            pageButton.innerHTML = `<a href="#">${i}</a>`;
            if (i === page) {
                pageButton.querySelector("a").style.backgroundColor = "#1565C0"; // Đổi màu cho trang hiện tại
            }
            pageButton.addEventListener("click", function() {
                renderProducts(i);
            });
            pagination.appendChild(pageButton);
        }

        // Thêm nút "Next"
        if (page < totalPages) {
            const nextButton = document.createElement("li");
            nextButton.innerHTML = `<a href="#">Next</a>`;
            nextButton.addEventListener("click", function() {
                renderProducts(page + 1);
            });
            pagination.appendChild(nextButton);
        }
    }

    // Gọi hàm để hiển thị sản phẩm và phân trang cho trang đầu tiên
    renderProducts(currentPage);
});
