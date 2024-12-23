import Api from "../services/api.js";
import Product from "../models/product.js";
import validateProduct from "../models/validation.js";

const renderListPhone = (data) =>{
    let content = "";
    data.forEach((product, i)=>{
        content +=`
        <tr>
            <td>${i + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
                <img src="${product.img}" />
            </td>
            <td>${product.type}</td>
            <td>${product.desc}</td>    
            <td>
                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
  data-modal-toggle="default-modal"
  onclick="handleEdit(${product.id})">EDIT</button>
                <button class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5" onclick="handleDelete(${product.id})">DELETE</button>
                
            </td>
        </tr>
        `
    });
    getEleId("tblDanhSachSP").innerHTML = content   


}
const handleEdit = (id)=>{
    const modal = document.getElementById("default-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Product"
  const btnUpdate = `<button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onclick="handleUpdate(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate
//   call api
const promise =Api.getDataById(id);
promise
.then((result)=>{
    const {data} = result
    getEleId("TenSP").value = data.name;
    getEleId("GiaSP").value = data.price;
    getEleId("ScreenSP").value = data.screen;
    getEleId("BackCameraSP").value = data.backCamera;
    getEleId("FrontCameraSP").value =data. frontCamera;
    getEleId("HinhSP").value = data.img;
    getEleId("LoaiSP").value = data.type;
    getEleId("MoTa").value = data.desc;
})
.catch((error)=>{
    console.log(error)

})
}
const handleUpdate = (id) =>{
    const name = getEleId("TenSP").value;
    const price = getEleId("GiaSP").value;
    const screen = getEleId("ScreenSP").value;
    const backCamera = getEleId("BackCameraSP").value;
    const frontCamera = getEleId("FrontCameraSP").value;
    const img = getEleId("HinhSP").value;
    const type = getEleId("LoaiSP").value;
    const desc = getEleId("MoTa").value;


    const product = new Product(id, name,price,screen,backCamera,frontCamera,img,type,desc );

    const promise = Api.updateData(product);

    promise
    .then((result)=>{
        alert(`Update product id: ${result.data.id} success`);
        getListProduct();
        document.getElementsByClassName("close")[0].click();

    })
    .catch((error)=>{
        console.log(error)

    })
   
}
window.handleUpdate = handleUpdate;

window.handleEdit = handleEdit;
const handleDelete = (id) => {
    const promise = Api.deleteDataById(id);
    promise
    .then((result)=>{
        console.log(result.data);
        alert(`Delete product id: ${result.data.id} success`)
        getListProduct()
    })
    .catch((error)=>{
        console.log(error)
        

    })
    
   

}

window.handleDelete = handleDelete


const getEleId = (id) => document.getElementById(id);

const getListProduct = () => {
   const promise = Api.fetchData();
   promise
   .then((result)=>{
    renderListPhone(result.data)
   })
   .catch((error)=>{
    console.log(error)
   })
};
getListProduct(); 

getEleId("btnThem").addEventListener("click", () => {
    const btnThemSP = `<button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onclick="handleThem()">Thêm</button>`;
    document.getElementsByClassName("modal-footer ")[0].innerHTML = btnThemSP;

   

});

const handleThem = () => {
    const name = getEleId("TenSP").value;
    const price = getEleId("GiaSP").value;
    const screen = getEleId("ScreenSP").value;
    const backCamera = getEleId("BackCameraSP").value;
    const frontCamera = getEleId("FrontCameraSP").value;
    const img = getEleId("HinhSP").value;
    const type = getEleId("LoaiSP").value;
    const desc = getEleId("MoTa").value;

    const product = {
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        type,
        desc
    };

    const errors = validateProduct(product);
    if (errors) {
        console.log("Validation errors:", errors);
        alert("Please fix the following errors:\n" + Object.values(errors).join("\n"));
        return;
    }

    const newProduct = new Product("", name, price, screen, backCamera, frontCamera, img, type, desc);

    const promise = Api.addData(newProduct);

    promise
        .then((result) => {
            alert(`Add product id: ${result.data.id} success!`);
            getListProduct();
            document.getElementsByClassName("close")[0].click();
        })
        .catch((error) => {
            console.log(error);
        });
};
window.handleThem = handleThem;
const handleSearch = () => {
    const searchName = getEleId("searchName").value.trim().toLowerCase();
    if (!searchName) {
        alert("Vui lòng nhập tên sản phẩm cần tìm!");
        return;
    }

    const promise = Api.fetchData();
    promise
        .then((result) => {
            const products = result.data;
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchName)
            );

            if (filteredProducts.length === 0) {
                alert("Không tìm thấy sản phẩm phù hợp!");
                return;
            }

            renderListPhone(filteredProducts); 
        })
        .catch((error) => {
            console.log("Lỗi khi tìm kiếm sản phẩm:", error);
        });
};

window.handleSearch = handleSearch;
const handleSortByPrice = (order) => {
    const promise = Api.fetchData(); 
    promise
        .then((result) => {
            const products = result.data;
            const sortedProducts = products.sort((a, b) => {
                return order === "asc" ? a.price - b.price : b.price - a.price;
            });

            renderListPhone(sortedProducts); 
        })
        .catch((error) => {
            console.log("Lỗi khi sắp xếp sản phẩm:", error);
        });
};


getEleId("selGia").addEventListener("change", (event) => {
    const value = event.target.value;
    if (value === "loai1") {
        handleSortByPrice("asc"); 
    } else if (value === "loai2") {
        handleSortByPrice("desc"); 
    } else {
        getListProduct(); 
    }
});






