import type {DetailedHTMLProps, FC, ImgHTMLAttributes} from "react";
import {useEffect, useRef, useState} from 'react'

const LazyImg:FC<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (props)=>{
    const {src='',...restProps} = props;
    const imgRef = useRef<HTMLImageElement|null>(null);
    const [currentSrc,setCurrentSrc] = useState('');
    useEffect(()=>{
      let inst:IntersectionObserver|undefined;
      if(globalThis.IntersectionObserver&&imgRef.current){
        inst =  new IntersectionObserver(([entry])=>{
          if(entry.isIntersecting){
        
            setCurrentSrc(src)
          }
        })
       inst.observe(imgRef.current);
      }
      return ()=>{
        if(inst)inst.disconnect();
      }
    },[]);
    return <img {...restProps} ref={imgRef} src={currentSrc} />
}

export default LazyImg