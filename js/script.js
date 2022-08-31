var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productQuantity = document.getElementById("productQuantity")
var button = document.getElementById("button")
var productInfo = document.getElementById("productInfo")
var deleteButton = document.getElementById("deleteButton")
var updateButton = document.getElementById("updateButton")
var productUpdatedButton = document.getElementById("productUpdatedButton")
var container = []

// localStorage 

if (localStorage.getItem('product') != null) {
    container = JSON.parse(localStorage.getItem('product'))
    displayProduct(container)

} else {
    container = []
}

button.onclick = function() {
    container.push({
        name:productName.value,
        price:productPrice.value,
        cate:productCategory.value,
        quantity:productQuantity.value
    })

    localStorage.setItem('product', JSON.stringify(container))
    displayProduct(container)
    resetText()

}

function displayProduct(productList) {

    var cartoona = ``
    for (i = 0 ; i < productList.length; i++) {
        cartoona +=    
                            `<tr>
                                <td>${i+1}</td>
                                <td>${productList[i].name}</td>
                                <td>${productList[i].price}</td>
                                <td>${productList[i].cate}</td>
                                <td>${productList[i].quantity}</td>
                                <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning" id="updateButton">Update</button></td>
                                <td><button  onclick="deleteOnce(${i})" class="btn btn-outline-danger" id="deleteButton">Delete</button></td>
                                <td><button  onclick="deleteProduct(${i})" class="btn btn-outline-danger" id="deleteButton">Delete-All</button></td>

                            </tr>`
                        
    }


    productInfo.innerHTML = cartoona

}

function resetText() {
        productName.value =  "",
        productPrice.value =  "",
        productCategory.value =  "",
        productQuantity.value =  "";
}



function deleteOnce(indexProduct) {
    if(container[indexProduct].quantity == 1) {
        deleteProduct(indexProduct)
    } else {
        container[indexProduct].quantity = container[indexProduct].quantity - 1
        localStorage.setItem('product', JSON.stringify(container))

        displayProduct(container)

    }
}



function deleteProduct(indexProduct) {
    container.splice(indexProduct,1)
    localStorage.setItem('product', JSON.stringify(container))
    displayProduct(container)
}





function searchItem(letters) {

    searched = []
    for (i = 0; i < container.length; i ++) {
        if(container[i].name.toLowerCase().includes(letters.toLowerCase()))

        searched.push(container[i])
    }
    displayProduct(searched)
}


var afterUpdatedIndex;
function updateProduct(updatedIndex) {
    productName.value = container[updatedIndex].name
    productPrice.value = container[updatedIndex].price
    productCategory.value = container[updatedIndex].cate
    productQuantity.value = container[updatedIndex].quantity

    productUpdatedButton.classList.remove("d-none")
    button.classList.add("d-none")

    afterUpdatedIndex =  updatedIndex
}



function afterUpdated() {
    
    container.splice(afterUpdatedIndex,1,{name:productName.value,price:productPrice.value,cate:productCategory.value,quantity:productQuantity.value})
    displayProduct(container)
    resetText()
    localStorage.setItem('product', JSON.stringify(container))
    button.classList.remove("d-none")
    productUpdatedButton.classList.add("d-none")
}















