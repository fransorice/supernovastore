import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase/config';
import ItemDetail from '../../ItemDetail';

const ItemDetailContainer = () => {

  const [detail, setDetail] = useState({})

  const {id} = useParams()

  //Este effect se ejecuta cuando se monta el componente
  useEffect(()=> {

    const getProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const productDetail = {
          id: docSnap.id,
          ...docSnap.data()
        }
        setDetail(productDetail);
      } else {
        console.log("No such document!");
      }
    }

    getProduct();

  }, [id])

  return (
    <div>
        {
          Object.keys(detail).length === 0 
            ? <h2>Cargando...</h2>
            : <ItemDetail detail={detail}/>
        }
    </div>
  )
}

export default ItemDetailContainer