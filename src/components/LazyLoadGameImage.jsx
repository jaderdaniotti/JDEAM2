import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {
    return (
        <LazyLoadImage
            src={image}
            alt="Game Image"
            effect="blur"
            className="w-full h-48 object-cover"
            wrapperProps={{
                style: {transitionDelay: "0.1s", transitionDuration: "0.2s"}
            }}
        />
    );
}