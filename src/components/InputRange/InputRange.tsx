import {ChangeEventHandler} from "react";

type Props = {
    label?: string;
    min?: string;
    max: string;
    step?: string;
    value: number;
    onChange: ChangeEventHandler<HTMLInputElement>
};

export const InputRange = ({label, min = "0", max, step = "0.1", value, onChange}: Props) => {
    return <label>
        {label}
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
        />
    </label>;
};

