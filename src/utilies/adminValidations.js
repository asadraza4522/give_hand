export const createPostValidation = ({ productName, brandName, categories, price, discountPrice }) => {


    if (productName === '') {
        return {
            valid: false,
            errors: productName === '' ? "Please Enter Product Name" : null
        }
    }
    else if (categories.length == 0) {
        return {
            valid: false,
            errors: categories.length == '' ? "Please Choose atleast one category!" : null
        }
    }
    else if (price < 0 || price == '') {
        return {
            valid: false,
            errors: price == '' ? "Please Enter Price" : price < 0 ? "Please Choose Valid Price" : null
        }
    }
    else if (discountPrice != '' && discountPrice < 0) {
        return {
            valid: false,
            errors: discountPrice != '' && discountPrice < 0 ? "Please Enter Valid Discount Price"  : null
        }
    }
    else {
        return { valid: true, errors: null }
    }
}