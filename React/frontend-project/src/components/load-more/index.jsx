import "./style.css"
import { useEffect,useState } from "react"


export default function LoadMore({url}){

    const [products,setProducts]=useState([])
    const [skip,setSkip]=useState(80)
    const [errMessage,setErrMessage]=useState(null)
    const [loading,setLoading]=useState(true)
    
    
    async function fetchProducts(getUrl){
        try{
            setLoading(true)
            const response = await fetch (getUrl)
            const data = await response.json()

            setProducts(data.products)
            setLoading(false)
        }catch(e){
            setErrMessage(e.messaage)
            setLoading(false)
        }
       
    }

   
    function handleLoadMore(){
        skip !== 0 ? setSkip(skip-20) : <div>100 items loaded,limit reached</div>
        console.log(skip)
    }
    useEffect(() => {
        if (url !== "") fetchProducts(`${url}?limit=100&skip=${skip}`);
      }, [url,skip]);


    if(loading){
        return <div>loading please wait</div>
    } 
    if(errMessage !== null){
        return <div>error occurred! {errMessage}</div>
    }
  

    return <div className="container">

        {
           products.map(product =>(
            <div className="product-container" key={[product.id]}>
                <img src={product.thumbnail} alt={product.description} className="product-image"/>
                <p className="product-desc">{product.title}</p>
            </div>
        ))
        }
    <button className="loadMore" 
    onClick={()=>handleLoadMore()}
    disabled={skip === 0}
    >Load more</button>
    </div>


}