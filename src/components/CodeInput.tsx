import { useRef, useState } from "react";

type Props = {
  numDigits?: number;
  setPasscode?: (a: string) => void;
};

const CodeInput = (props: Props) => {
  const numDigits = props.numDigits ?? 6;

  const [passcode, setPasscodeInternal] = useState(Array(numDigits).fill(""));
  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Blocks non-numeric input

    const newPasscode = [...passcode];
    newPasscode[index] = value;
    setPasscodeInternal(newPasscode);
    props.setPasscode?.(newPasscode.join(""));

    if (value && index < numDigits - 1) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspaceAndEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    // Moves input focus on the current passcode digit
    if (event.key === "Backspace" && !passcode[index] && index > 0) {
      digitRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "Enter" &&
      event.currentTarget.value &&
      index < numDigits - 1
    ) {
      digitRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent, index: number) => {
    event.preventDefault()
    let pastedText = event.clipboardData.getData("text")
    if (!/^\d*$/.test(pastedText)) return; // Blocks non-numeric input

    // Truncates extra characters
    const trimmedText =
      pastedText.length + index > numDigits
        ? pastedText.slice(0, numDigits - index)
        : pastedText;

    const newPasscode = passcode;
    for (let i = 0; i < trimmedText.length; i += 1) {
      newPasscode[index + i] = trimmedText[i];
    }

    setPasscodeInternal(newPasscode);
    props.setPasscode?.(newPasscode.join(""));

    digitRefs.current[index + pastedText.length]?.focus();
  };

  return (
    <div className="flex gap-2 *:shrink">
      {passcode.map((digit, i) => (
        <input
          ref={(ref) => (digitRefs.current[i] = ref)}
          className="input min-w-0 aspect-square text-3xl text-center"
          type="text"
          key={`digit-input-${i}`}
          value={digit}
          maxLength={1}
          onChange={(event) => handleChange(event.currentTarget.value, i)}
          onKeyUp={(event) => handleBackspaceAndEnter(event, i)}
          onPaste={(event) =>
            handlePaste(event, i)
          }
        />
      ))}
    </div>
  );
};

export default CodeInput;
