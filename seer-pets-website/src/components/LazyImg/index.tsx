import { LoadingOutlined } from "@ant-design/icons";
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

const LazyImg: FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let inst: IntersectionObserver | undefined;
    if (globalThis.IntersectionObserver && imgRef.current) {
      inst = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = props.src as string;
          if (img.complete) {
            setLoading(false);
            imgRef.current = null;
          }
          img.onload = () => {
            setLoading(false);
            imgRef.current = null;
          };
        }
      });
      inst.observe(imgRef.current);
    }
    return () => {
      if (inst) inst.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading ? (
    <div
      ref={imgRef}
      className={props.className}
      style={{ width: "100%", textAlign: "center" }}
    >
      <LoadingOutlined
        style={{ fontSize: "40px", color: "#08c", marginTop: "35px" }}
      />
    </div>
  ) : (
    <img {...props} />
  );
};

export default LazyImg;
