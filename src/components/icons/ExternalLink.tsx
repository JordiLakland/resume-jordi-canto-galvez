interface ExternalLinkIconProps {
    className?: string;
    fill?: string;
}

export default function ExternalLinkIcon(props: ExternalLinkIconProps) {
    const { className, fill } = props;

    return (
        <svg
            aria-hidden="true"
            className={className}
            fill={fill || "currentColor"}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M5 5h6v2H7v10h10v-4h2v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
            <path d="M13 5h6a1 1 0 0 1 1 1v6h-2V8.414l-7.293 7.293-1.414-1.414L16.586 7H13V5z" />
        </svg>
    );
}

