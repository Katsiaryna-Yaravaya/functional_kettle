import "./styles.css"

type Props = {
    src:string;
    alt: string;
    className?: string;
};

export const Image = ({src, alt, className}: Props) => {
    return <img src={src} alt={alt} className={className}/>;
};
