
import React from "react";

export function MyHooks({ title, id }: { title: string, id?: string }) {
    const items = 10
    const multiplier = 5

    const result = React.useMemo(
        () => calculate(items, multiplier),
        [items, multiplier]
    )
    // React.useEffect(() => {
    //     console.log('componentDidMount');
    //     console.log('componentWillUpdate');
    // });

    // React.useEffect(() => {
    //     console.log('componentDidMount');
    //     return () => {
    //         console.log('componentWllUnmount');
    //     }
    // }, []);

    // React.useEffect(() => {
    //     console.log('componentWillReceiveProps:', title);
    // }, [title]);

    // const [isMounted] = useIsMounted();

    // React.useEffect(() => {
    //     console.log('isMounted', isMounted);
    // }, [isMounted]);

    return (
        <div>{title} {id} {result}</div>
    )
}


function useIsMounted() {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true)
    }, [])
    // из hook вернуть массив значей,
    return [isMounted]
}

function calculate(items: number, multiplier: number) {
    return new Array(items).fill(1).reduce((a, v) => a * multiplier);
}
