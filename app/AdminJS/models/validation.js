
const validateName = (name) => {
    if (!name.trim()) return "Tên sản phẩm không được để trống.";
    if (name.length < 3) return "Tên sản phẩm phải có ít nhất 3 ký tự.";
    return null;
};

const validatePrice = (price) => {
    if (!price) return "Giá sản phẩm không được để trống.";
    if (isNaN(price) || Number(price) <= 0) return "Giá sản phẩm phải là một số dương.";
    return null;
};

const validateImage = (img) => {
    const imageRegex = /\.(jpg|jpeg|png|gif)$/i;
    if (!img.trim()) return "URL hình ảnh không được để trống.";
    if (!imageRegex.test(img)) return "URL hình ảnh phải có đuôi .jpg, .jpeg, .png hoặc .gif.";
    return null;
};
const validateType = (type) => {
    console.log(type)
};

const validateDescription = (desc) => {
    if (!desc.trim()) return "Mô tả sản phẩm không được để trống.";
    if (desc.length < 10) return "Mô tả sản phẩm phải có ít nhất 10 ký tự.";
    return null;
};


const validateProduct = (product) => {
    const errors = {};

    const nameError = validateName(product.name);
    if (nameError) errors.name = nameError;

    const priceError = validatePrice(product.price);
    if (priceError) errors.price = priceError;

    const imageError = validateImage(product.img);
    if (imageError) errors.img = imageError;

    const typeError = validateType(product.type);
    if (typeError) errors.type = typeError;

    const descriptionError = validateDescription(product.desc);
    if (descriptionError) errors.desc = descriptionError;

    return Object.keys(errors).length > 0 ? errors : null;
};

export default validateProduct;
