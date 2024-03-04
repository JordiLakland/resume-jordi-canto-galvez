interface SvgIconComponentProps {
    ariaHidden?: boolean;
    className?: string;
    fill?: string;
    path: string;
    viewBox: string;
}

export default function SvgIconComponent(props: SvgIconComponentProps) {

    const { ariaHidden = true, className, fill, path, viewBox } = props;

    return (
        <svg
            aria-hidden={ariaHidden}
            className={className}
            fill={fill}
            viewBox={viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={path} />
        </svg>
    )
}