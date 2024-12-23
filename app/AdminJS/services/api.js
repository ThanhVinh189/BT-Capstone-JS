class Api{
    fetchData(){
        const promise = axios({
            url:"https://6748642a5801f5153590a1dc.mockapi.io/api/Capstone",
            method:"GET"

        })
        return promise 
    }
    deleteDataById(id){
        const promise = axios({
            url:`https://6748642a5801f5153590a1dc.mockapi.io/api/Capstone/${id}`,
            method:"DELETE"
        })
        return promise

    }
    
    addData(product){
        const promise = axios({
            url:`https://6748642a5801f5153590a1dc.mockapi.io/api/Capstone`,
            method:"POST",
            data: product
        })
        return promise
    }
    getDataById(id){
        const promise = axios({
            url:`https://6748642a5801f5153590a1dc.mockapi.io/api/Capstone/${id}`,
            method:"GET"
        })
        return promise

    }
    updateData(product){
        const promise = axios({
            url:`https://6748642a5801f5153590a1dc.mockapi.io/api/Capstone/${product.id}`,
            method:"PUT",
            data: product
        })
        return promise
    }
    
    
    
}


export default new Api
