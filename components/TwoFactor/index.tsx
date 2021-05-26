/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';
/*
Prompt https://frontendeval.com/questions/code-input
Create a 4-digit security code input that allows you to enter a two-factor authorization code. 
Implement a form submission handler that calls a submitCode(code) function with the 4 digits as a concatenated string. Implement a submitCode function that validates the code given against a hardcoded 4-digit string.

The inputs should be as usable as possible, specifically:
1. Each field should allow only one digit between 0-9. Any other input should be rejected
2.Entering a number in a field should advance the cursor to the next field, except in the case of the last field
3. Pressing backspace at the beginning of a field (whether that field is populated or not) should focus the previous field and delete the input inside
4. Very basic styling guidance:
  * Inputs should be positioned next to one another
  * Inputs should be roughly rectangular as pictured
  * Submit button should be positioned below

*/
const inputs = [0, 1, 2, 3];
const TwoFactor = () => {
  const [code, setCode] = useState(() => ['', '', '', '']);
  const [error, setError] = useState('');

  const submitCode = (e) => {
    e.preventDefault();

    if (code.length < 4) {
      setError('Need 4 digits to continue');
    }

    console.log('Submitted');
  };

  const handleInput = (i: number) => (e) => {
    let { value } = e.target;

    if (value.length > 1) {
      value = value.charAt(0);
    }

    if (!/^[0-9]+$/.test(value)) {
      value = '';
    }

    const mutableArr = [...code];
    mutableArr[i] = value;
    setCode(mutableArr);

    if (!value) {
      return;
    }

    const { form } = e.target;
    if (form.elements[i + 1]) {
      form.elements[i + 1].focus();
    }
    // QUESTION: should I submit when all 4 are present?
  };

  const handleBackSpace = (i: number) => (e) => {
    if (e.key === 'Backspace') {
      const mutableArr = [...code];
      mutableArr[i] = '';
      setCode(mutableArr);
      const { form } = e.target;
      if (form.elements[i - 1]) {
        form.elements[i - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    const { clipboardData } = e;
    const pastedData = clipboardData.getData('Text');
    if (pastedData.length !== 4 || Number.isNaN(parseInt(pastedData, 10))) {
      return;
    }
    setCode(pastedData.split(''));
    // QUESTION: should I submit?
  };

  return (
    <>
      <form onSubmit={submitCode}>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          {inputs.map((input) => (
            <input
              type="text"
              autoFocus={input === 0}
              pattern="[0-9]{1}"
              required
              key={input}
              value={code[input]}
              style={{ marginRight: 5, width: 25 }}
              name={`two-factor: ${input}`}
              onChange={handleInput(input)}
              onKeyUp={handleBackSpace(input)}
              onPaste={handlePaste}
            />
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
};

export default TwoFactor;
