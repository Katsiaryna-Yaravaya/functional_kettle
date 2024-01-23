import {MouseEventHandler} from "react";

type Props = {
    name: string;
    disabled?: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>
};

export const Button = ({name, disabled, onClick}: Props) => {
    return <button type="submit" disabled={disabled} onClick={onClick}> {name} </button>;
};

