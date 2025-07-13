import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Libro principal */}
            <path
                d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
                fill="currentColor"
            />
            {/* Páginas del libro */}
            <path
                d="M6 6C6 5.44772 6.44772 5 7 5H17C17.5523 5 18 5.44772 18 6V18C18 18.5523 17.5523 19 17 19H7C6.44772 19 6 18.5523 6 18V6Z"
                fill="white"
                fillOpacity="0.9"
            />
            {/* Líneas de texto */}
            <path
                d="M8 8H16V9H8V8Z"
                fill="currentColor"
                fillOpacity="0.3"
            />
            <path
                d="M8 11H14V12H8V11Z"
                fill="currentColor"
                fillOpacity="0.3"
            />
            <path
                d="M8 14H16V15H8V14Z"
                fill="currentColor"
                fillOpacity="0.3"
            />
            {/* Lomo del libro */}
            <path
                d="M19 4V20C19 20.5523 18.5523 21 18 21H19C19.5523 21 20 20.5523 20 20V4C20 3.44772 19.5523 3 19 3H18C18.5523 3 19 3.44772 19 4Z"
                fill="currentColor"
                fillOpacity="0.7"
            />
        </svg>
    );
}
