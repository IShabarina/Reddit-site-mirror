import React from "react";

interface IItem {
    As?: 'a' | 'li' | 'button' | 'div';
    id: string;
    className?: string;
    onClick?: (prop?: any) => void;
    href?: string;
    element: React.ReactNode;
}

interface IGenericListProps {
    list: IItem[];
}

const noop = () => { };

export function GenericList({ list }: IGenericListProps) {
    return (
        <>
            {list.map(({ As = 'div', onClick = noop, className, id, href, element }) => (
                <As
                    className={className}
                    onClick={() => onClick()}
                    key={id}
                    href={href}
                >
                    {element}
                </As>
            ))}
        </>
    );
}