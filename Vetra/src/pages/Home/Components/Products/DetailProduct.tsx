interface ProductProps{
    product_id :number
}


export default function DetailProduct({product_id} : ProductProps){
    return (
        <div> {product_id}</div>
    )
}